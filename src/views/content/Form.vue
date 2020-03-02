<!-- 发布内容 -->
<template>
    <div class="formContent">
        <h4>{{ name === 'add' ? '新建内容' : '编辑内容' }}</h4>
        <el-form
            v-loading="listLoading"
            :model="ruleForm"
            :rules="rules"
            ref="ruleForm"
            label-width="100px"
            class="ruleForm"
        >
            <el-form-item label="标题" prop="title">
                <el-input v-model="ruleForm.title"></el-input>
            </el-form-item>
            <el-form-item label="标签" prop="tag">
                <el-select v-model="ruleForm.tag" placeholder="请选择标签">
                    <el-option
                        v-for="(item, index) in tabsData"
                        :key="`tabItem_${index}`"
                        :label="item.name"
                        :value="item.id"
                    ></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="内容" prop="desc">
                <el-input
                    type="textarea"
                    :autosize="{ minRows: 8, maxRows: 20 }"
                    v-model="ruleForm.desc"
                ></el-input>
            </el-form-item>
            <el-form-item label="上传文件" prop="upload">
                <el-upload
                    action="#"
                    list-type="picture-card"
                    :auto-upload="false"
                    :file-list="fileList"
                    :on-change="handleChangeAdd"
                    ref="upload"
                >
                    <i slot="default" class="el-icon-plus"></i>
                    <div slot="file" slot-scope="{ file }">
                        <img
                            class="el-upload-list__item-thumbnail"
                            :src="file.url"
                            alt=""
                        />
                        <span class="el-upload-list__item-actions">
                            <span
                                class="el-upload-list__item-preview"
                                @click="handlePictureCardPreview(file)"
                            >
                                <i class="el-icon-zoom-in"></i>
                            </span>
                            <span
                                v-if="!disabled"
                                class="el-upload-list__item-delete"
                                @click="handleRemove(file)"
                            >
                                <i class="el-icon-delete"></i>
                            </span>
                        </span>
                    </div>
                </el-upload>
                <el-dialog :visible.sync="dialogVisible">
                    <video
                        v-if="type == 'video/mp4'"
                        v-bind:src="dialogImageUrl"
                        class="avatar video-avatar"
                        style="width:100%;height:100%"
                        controls="controls"
                    >
                        您的浏览器不支持视频播放
                    </video>
                    <img v-else width="100%" :src="dialogImageUrl" alt="" />
                </el-dialog>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')"
                    >确认</el-button
                >
                <!-- <el-button @click="resetForm('ruleForm')">重置</el-button> -->
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import {
    getTagList,
    uploadFile,
    addContent,
    contentDetail
} from '../../api/content'
export default {
    name: 'formContent',
    components: {},
    data() {
        return {
            listLoading: false,
            ruleForm: {
                title: '',
                tag: '',
                desc: ''
            },
            rules: {
                title: [
                    {
                        required: true,
                        message: '请输入内容标题',
                        trigger: 'blur'
                    },
                    {
                        min: 2,
                        max: 20,
                        message: '长度在 2 到 20 个字符',
                        trigger: 'blur'
                    }
                ],
                tag: [
                    {
                        required: true,
                        message: '请选择标签',
                        trigger: 'change'
                    }
                ],
                desc: [
                    {
                        required: true,
                        message: '请填内容',
                        trigger: 'blur'
                    }
                ]
            },
            tabsData: [],
            dialogImageUrl: '',
            dialogVisible: false,
            disabled: false,
            type: '', //存储上传文件类型
            imgUrl: [],
            fileList: [],
            name: 'add',
            id: ''
        }
    },
    mounted() {
        this.getTagList()
        this.name = this.$route.params.name ? this.$route.params.name : 'add'
        console.log(this.name)
        if (this.name != 'add' && this.name != undefined) {
            this.id = this.$route.params.id
            this.getDetail()
        }
    },
    methods: {
        //编辑表单调取查询接口
        getDetail() {
            let params = {
                contentid: this.id
            }
            contentDetail(params).then(res => {
                if (res.code == '200') {
                    this.ruleForm.title = res.data.title
                    this.ruleForm.tag = res.data.labelId
                    this.ruleForm.desc = res.data.content
                    this.imgUrl = res.data.imgUrl.split(',')
                    this.fileList = this.imgUrl.map(item => {
                        return {
                            url: item
                        }
                    })
                } else {
                    this.$message.error(res.message)
                }
            })
        },
        //获取标签列表
        getTagList() {
            getTagList().then(res => {
                if (res.code == '200') {
                    this.tabsData = res.data
                } else {
                    this.$message.error('标签' + res.message)
                }
            })
        },
        //创建表单按钮
        submitForm(formName) {
            this.listLoading = true

            this.$refs[formName].validate(valid => {
                if (valid) {
                    if (this.fileList.length == 0) {
                        this.$message.error('文件未上传，请上传文件')
                        this.listLoading = false
                    } else {
                        let imgUrl = this.imgUrl.map(item => {
                            return item.url
                        })
                        let parasm = {
                            id: this.id,
                            title: this.ruleForm.title,
                            labelId: Number(this.ruleForm.tag),
                            content: this.ruleForm.desc,
                            imgUrl: imgUrl
                        }
                        addContent(parasm).then(res => {
                            if (res.code == '200') {
                                setTimeout(() => {
                                    this.$router.push({
                                        name: 'formList'
                                    })
                                    this.$message.success(res.message)
                                    this.listLoading = false
                                }, 2000)
                            } else {
                                this.$message.error(res.message)
                                this.listLoading = false
                            }
                            console.log(res)
                        })
                    }
                } else {
                    this.listLoading = false
                    return false
                }
            })
        },
        //重置表单
        resetForm(formName) {
            this.$refs[formName].resetFields()
            this.$refs.upload.clearFiles()
        },
        //删除上传文件
        handleRemove(file) {
            console.log(file)
            this.$confirm('确定移除该文件？?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            })
                .then(() => {
                    //filter 返回true表示保留该元素（通过测试），false则不保留
                    this.imgUrl = this.fileList.filter(item => {
                        if (file.uid !== item.uid) {
                            return true
                        }
                    })
                    this.fileList = this.fileList.filter(item => {
                        if (file.uid !== item.uid) {
                            return true
                        }
                    })
                })
                .catch(() => {
                    this.$message({
                        type: 'info',
                        message: '取消删除操作'
                    })
                })
            return false
        },
        //查看文件调用
        handlePictureCardPreview(file) {
            console.log(file)
            this.type = file.raw.type
            this.dialogImageUrl = file.url
            this.dialogVisible = true
        },
        //上传文件成功后的响应
        handleChangeAdd(file, fileList) {
            let param = new FormData()
            param.append('fileName', file.raw)
            console.log(file, fileList)
            uploadFile(param).then(res => {
                this.imgUrl.push({
                    name: file.name,
                    uid: file.uid,
                    url: res
                })
            })
            this.fileList = fileList
            console.log(this.imgUrl)
        }
    }
}
</script>
<style lang="less" scoped>
.formContent {
    box-sizing: border-box;
    margin: 20px;
    padding: 10px;
    background: #fff;
    h4 {
        width: 100%;
        font-size: 18px;
        font-weight: bold;
        padding: 10px 0 20px 50px;
        box-sizing: border-box;
    }
    .ruleForm {
        width: 800px;
    }
}
</style>
