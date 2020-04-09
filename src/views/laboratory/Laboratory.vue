<!-- 实验室轮播图 -->
<template>
    <div class="laboratory">
        <div class="laboratory-list">
            <!--工具条-->
            <div class="toolbar">
                <el-row>
                    <el-col :span="6">
                        <el-button type="danger" @click="labRemove"
                            >批量删除</el-button
                        >
                        <el-button type="primary" @click="labAdd"
                            >添加</el-button
                        >
                    </el-col>
                    <el-col :span="6">
                        <el-input
                            placeholder="请输入内容"
                            v-model="searchInput"
                            clearable
                            style="width:200px;margin-right:10px;"
                        >
                        </el-input>
                        <el-button type="primary" @click="getLabList"
                            >搜索</el-button
                        >
                    </el-col>
                </el-row>
            </div>
            <!--列表-->
            <el-table
                :data="labList"
                highlight-current-row
                v-loading="listLoading"
                @selection-change="selsChange"
                style="width: 100%;"
            >
                <el-table-column type="selection" width="55"> </el-table-column>
                <el-table-column
                    prop="title"
                    label="标题"
                    width="150"
                    sortable
                ></el-table-column>
                <el-table-column
                    prop="abstracts"
                    label="摘要"
                    min-width="200"
                    sortable
                ></el-table-column>
                <el-table-column
                    prop="releaseDate"
                    label="发布时间"
                    min-width="150"
                    sortable
                >
                </el-table-column>
                <el-table-column prop="source" label="来源" min-width="150">
                </el-table-column>
                <el-table-column label="图片数量" min-width="150">
                    <template slot-scope="scope">
                        <span style="margin-left: 10px">{{
                            scope.row.img.split(',').length + ' ' + '张'
                        }}</span>
                    </template>
                </el-table-column>
                <el-table-column label="是否推荐" min-width="150">
                    <template slot-scope="scope">
                        <span style="margin-left: 10px">{{
                            scope.row.recommend ? '是' : '否'
                        }}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="name" label="分类" min-width="200">
                </el-table-column>
                <el-table-column label="操作" min-width="350" fixed="right">
                    <template slot-scope="scope">
                        <el-button
                            size="small"
                            type="info"
                            @click="handleEdit(scope.$index, scope.row)"
                            >编辑</el-button
                        >
                        <el-button
                            type="danger"
                            size="small"
                            @click="handleDel(scope.$index, scope.row)"
                            >删除</el-button
                        >
                    </template>
                </el-table-column>
            </el-table>

            <!--分页-->
            <div class="pageTools clearFix">
                <el-col :span="24">
                    <el-pagination
                        layout="prev, pager, next"
                        @current-change="handleCurrentChange"
                        :page-size="pageSize"
                        :total="total"
                    >
                    </el-pagination>
                </el-col>
            </div>
        </div>
        <!-- 添加用户弹框 -->
        <el-dialog
            :title="textMap[labStatus]"
            :visible.sync="labDialog"
            :close-on-click-modal="false"
            :close-on-press-escape="false"
            :before-close="handleClose"
        >
            <el-form
                :model="ruleForm"
                :rules="rules"
                ref="ruleForm"
                label-width="100px"
                class="demo-ruleForm"
            >
                <el-form-item label="标题" prop="title">
                    <el-input v-model="ruleForm.title"></el-input>
                </el-form-item>
                <el-form-item label="数据分类" prop="ltid">
                    <el-select v-model="ruleForm.ltid" placeholder="请选择分类">
                        <el-option label="请选择" value=""></el-option>
                        <el-option
                            v-for="(item, index) in labClassData"
                            :key="`labClassData_item_${index}`"
                            :label="item.name"
                            :value="item.id"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="摘要" prop="abstracts">
                    <el-input
                        type="textarea"
                        v-model="ruleForm.abstracts"
                    ></el-input>
                </el-form-item>
                <el-form-item label="来源" prop="source">
                    <el-input v-model="ruleForm.source"></el-input>
                </el-form-item>
                <el-form-item label="发布时间" required>
                    <el-col :span="11">
                        <el-form-item prop="releaseDate">
                            <el-date-picker
                                type="date"
                                placeholder="选择日期"
                                v-model="ruleForm.releaseDate"
                                format="yyyy 年 MM 月 dd 日"
                                value-format="yyyy-MM-dd"
                                style="width: 100%;"
                            ></el-date-picker>
                        </el-form-item>
                    </el-col>
                </el-form-item>
                <el-form-item label="轮播图片" ref="headimgUpload" prop="img">
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
                </el-form-item>
                <el-form-item label="是否推荐" prop="recommend">
                    <el-radio-group v-model="ruleForm.recommend">
                        <el-radio :label="1">是</el-radio>
                        <el-radio :label="0">否</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('ruleForm')"
                        >确认</el-button
                    >
                    <el-button @click="resetForm('ruleForm')">重置</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
        <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="" />
        </el-dialog>
    </div>
</template>

<script>
import {
    getList,
    add,
    getDetail,
    uploadFile,
    del,
    getLabClassifca
} from '../../api/laboratory'
import { getDate } from '@/lib/tools' // 设置浏览器头部标题
export default {
    name: 'Laboratory',
    components: {},
    data() {
        return {
            // 添加用户参数
            labStatus: '', //弹框是新增或者编辑状态
            textMap: {
                update: '编辑',
                create: '添加'
            },
            labDialog: false, //控制弹框是否显示
            ruleForm: {
                id: '',
                ltid: '',
                title: '',
                releaseDate: '',
                abstracts: '',
                img: [],
                recommend: 0,
                source: ''
            },
            rules: {
                title: [
                    {
                        required: true,
                        message: '请输入活动名称',
                        trigger: 'blur'
                    }
                ],
                ltid: [
                    { required: true, message: '请选择分类', trigger: 'change' }
                ],
                releaseDate: [
                    {
                        type: 'string',
                        required: true,
                        message: '请选择日期',
                        trigger: 'change'
                    }
                ],
                abstracts: [
                    {
                        required: true,
                        message: '请填写摘要',
                        trigger: 'blur'
                    }
                ],
                img: [
                    {
                        type: 'array',
                        required: true,
                        message: '请至少上传一个轮播图片',
                        trigger: 'change'
                    }
                ],
                recommend: [
                    {
                        required: true,
                        message: '请选择活动资源',
                        trigger: 'change'
                    }
                ],
                source: [
                    {
                        required: true,
                        message: '请输入来源',
                        trigger: 'blur'
                    }
                ]
            },
            dialogImageUrl: '',
            dialogVisible: false,
            disabled: false,
            imgUrl: [],
            fileList: [],

            labList: [],
            listLoading: false,
            pageIndex: 1,
            pageSize: 10,
            total: 0,
            searchInput: '',
            // 列表选中列
            sels: [],

            labClassData: []
        }
    },
    mounted() {
        this.ruleForm.releaseDate = getDate()
        this.getLabList()
        this.getLabClassifcaList()
    },
    watch: {
        imgUrl(arr) {
            this.ruleForm.img = arr.map(item => {
                return item.url
            })
            if (arr.length != 0) this.$refs.headimgUpload.clearValidate() // 关闭校验
        }
    },
    methods: {
        //获取分类数据
        getLabClassifcaList() {
            getLabClassifca().then(res => {
                if (res.code == '200') {
                    this.labClassData = res.data
                } else {
                    this.$message.error(res.message)
                }
            })
        },
        //获取列表
        getLabList() {
            this.listLoading = true
            let params = {
                key: this.searchInput,
                pageIndex: this.pageIndex,
                pageSize: this.pageSize
            }
            getList(params).then(res => {
                if (res.code == '200') {
                    this.labList = res.data.list
                    this.total = res.data.totalRecords
                    this.listLoading = false
                } else {
                    this.$message.error(res.message)
                    this.listLoading = false
                }
            })
        },
        // 全选单选多选
        selsChange(sels) {
            this.sels = sels
            console.log(this.sels)
        },
        //批量删除
        labRemove() {
            if (this.sels.length < 1) return false
            let arr = this.sels.map(item => {
                return item.id
            })
            let params = { ids: arr }
            del(params).then(res => {
                if (res.code === '200') {
                    this.$message.success(res.message)
                    this.getLabList()
                }
            })
        },
        //单个删除
        handleDel(index, row) {
            let arr = []
            arr.push(row.id)
            let params = { ids: arr }
            del(params).then(res => {
                if (res.code === '200') {
                    this.$message.success(res.message)
                    this.getLabList()
                } else {
                    this.$message.error(res.message)
                    this.getLabList()
                }
            })
        },
        //添加
        labAdd() {
            this.ruleForm = {
                id: '',
                title: '',
                releaseDate: '',
                abstracts: '',
                img: [],
                ltid: '',
                recommend: 0,
                source: ''
            }
            this.ruleForm.releaseDate = getDate()
            this.labStatus = 'create'
            this.labDialog = true
            this.ruleForm.id = ''
        },
        //编辑
        handleEdit(index, row) {
            this.labDialog = true
            this.labStatus = 'update'
            this.getItemDetail(index, row)
        },
        //获取详情
        getItemDetail(index, row) {
            this.ruleForm.id = row.id
            let params = { id: this.ruleForm.id }
            getDetail(params).then(res => {
                if (res.code === '200') {
                    this.ruleForm = res.data
                    this.ruleForm.img = res.data.img.split(',')
                    this.fileList = this.ruleForm.img.map(item => {
                        return {
                            url: item
                        }
                    })
                    this.imgUrl = this.ruleForm.img.map(item => {
                        return {
                            url: item
                        }
                    })
                    console.log(this.ruleForm.img)
                }
            })
        },
        //编辑修改提交
        editBtnFn(formName) {
            console.log(formName)
            let params = this.ruleForm
            add(params).then(res => {
                if (res.code === '200') {
                    this.userDialog = false
                    this.$refs[formName].resetFields()
                    this.$message.success(res.message)
                    this.getLabList()
                } else {
                    this.$message.error(res.message)
                }
            })
        },
        //分页
        handleCurrentChange(val) {
            this.pageIndex = val
            this.getLabList()
        },
        //轮播时间
        handleChange(value) {
            console.log(value)
        },
        //删除上传文件
        handleRemove(file) {
            console.log(file)
            this.$confirm('确定移除该文件？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            })
                .then(() => {
                    //filter 返回true表示保留该元素（通过测试），false则不保留
                    if (this.labStatus === 'create') {
                        this.imgUrl = this.imgUrl.filter(item => {
                            if (file.uid !== item.uid) {
                                return true
                            }
                        })
                    } else {
                        this.imgUrl = this.imgUrl.filter(item => {
                            if (file.url !== item.url) {
                                return true
                            }
                        })
                    }

                    console.log(this.imgUrl)
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
            this.dialogImageUrl = file.url
            this.dialogVisible = true
        },
        //上传文件成功后的响应
        handleChangeAdd(file, fileList) {
            console.log(this.fileList)
            let param = new FormData()
            param.append('fileName', file.raw)
            uploadFile(param).then(res => {
                this.imgUrl.push({
                    name: file.name,
                    uid: file.uid,
                    url: res
                })
            })
            this.fileList = fileList
        },
        //提交
        submitForm(formName) {
            console.log(this.ruleForm)
            this.$refs[formName].validate(valid => {
                if (valid) {
                    let params = this.ruleForm
                    params.img = params.img.join(',')
                    add(params).then(res => {
                        if (res.code === '200') {
                            this.userDialog = false
                            this.$refs[formName].resetFields()
                            this.$message.success(res.message)
                            this.getLabList()
                            this.fileList = []
                            this.imgUrl = []
                            this.ruleForm.img = []
                            this.labDialog = false
                            console.log(this.imgUrl, this.fileList)
                        } else {
                            this.$message.error(res.message)
                        }
                    })
                } else {
                    this.$message.error('提交失败')
                    return false
                }
            })
        },
        //重置
        resetForm(formName) {
            this.$refs[formName].resetFields()
        },
        handleClose(done) {
            this.$confirm('确认关闭？')
                .then(() => {
                    for (let k in this.ruleForm) {
                        if (k === 'img') {
                            this.ruleForm[k] = []
                        } else if (k === 'releaseDate ') {
                            this.ruleForm[k] = getDate()
                        } else {
                            this.ruleForm[k] = ''
                        }
                    }
                    console.log(this.ruleForm)
                    this.fileList = []
                    done()
                })
                .catch(() => {})
        }
    }
}
</script>
<style lang="less" scoped>
.laboratory {
    width: 100%;
    padding: 20px 10px;
    box-sizing: border-box;
    &-list {
        width: 100%;
        height: 100%;
    }
}
</style>
