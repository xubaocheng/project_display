<!-- 阅读器 -->
<template>
    <div id="box" @click="turningPage">
        <div class="page">
            <div class="front"></div>
            <div class="back"></div>
        </div>
        <div class="page2"></div>
    </div>
</template>

<script>
export default {
    name: 'home',
    data() {
        return {
            bReady: true,
            iNow: 0,
            oBox: '',
            oPage: '',
            oPage2: '',
            oFront: '',
            oBack: ''
        }
    },
    methods: {
        turningPage() {
            /* 我们先获取一下需要用到的页面中的元素 */

            /* 定义一个变量this.iNow，这儿里是方便后续页面拉回与换图操作 */
            // this.iNow = 0;
            /* 这里定义一个变量，当页面点击后赋值成false,防止“麒麟臂”大神无限点击翻页。
            判断当运动完成后赋值为true */
            // this.bReady = true;
            /* 给box加一个点击事件，进行翻页 */
            // this.oBox.onclick = function(){
            /* 我们判断下，如果上次运动没结束就不能再开启新的运动，防止“撞车” */
            if (this.bReady == false) return
            this.bReady = false
            /* 这里我们将this.iNow的值进行++，我因为我们翻页了，所有图自然的就会加1 */
            this.iNow++
            /* 设置翻页的运动时间运动形式等参数 */
            this.oPage.style.transition = '1s all ease'
            /* 翻页操作 */
            this.oPage.style.WebkitTransform =
                'perspective(800px) rotateY(-180deg)'
            /* 这里说明一下“webkitTransitionEnd”为运动完成之后可触发的事件 */
            this.oPage.addEventListener(
                'webkitTransitionEnd',
                () => {
                    /* 这里当运动完成后我们进行拉回操作，将page的运动时间等设置为none，
                    // 并将翻页角度改为原来的0° */
                    this.oPage.style.transition = 'none'
                    this.oPage.style.WebkitTransform =
                        'perspective(800px) rotateY(0deg)'
                    /* 下面我就行换图操作 */
                    /* box的图为this.iNow%3,为啥模3呢，因为我们有三张图，如果你有八张图就模8 */
                    this.oBox.style.background = `url(${require('../../assets/img/' +
                        (this.iNow % 3) +
                        '.png')}) no-repeat`
                    this.oFront.style.background = `url(${require('../../assets/img/' +
                        (this.iNow % 3) +
                        '.png')})right top no-repeat`
                    /* 这里因为back和page2组合成同一张图，且他们比box和fron组合成的图永远多1，所以这里就是(this.iNow+1)%3 */
                    this.oBack.style.background = `url(${require('../../assets/img/' +
                        ((this.iNow + 1) % 3) +
                        '.png')}) no-repeat`
                    this.oPage2.style.background = `url(${require('../../assets/img/' +
                        ((this.iNow + 1) % 3) +
                        '.png')})right top no-repeat`
                    this.bReady = true
                    /* 这里我们所有的运动都完成后就将this.bReady赋值 为true*/
                },
                false
            )
            // };
        }
    },

    mounted() {
        this.oBox = document.getElementById('box')
        this.oPage = document.querySelector('.page')
        this.oPage2 = document.querySelector('.page2')
        this.oFront = document.querySelector('.front')
        this.oBack = document.querySelector('.back')
    }
}
</script>
<style lang="less" scoped>
/* 将页面展示区box设置宽高背景 */
#box {
    background: url('../../assets/img/0.png') no-repeat;
    // width: 700px;
    // height: 400px;
    width: 100%;
    height: 100%; /* 此处是为了让Box在中间显示 */
    position: relative;
}

/* 设定page的位置 */
#box .page {
    /* 因为其在展示区右侧，所以宽度为整个box的一般，并定在右侧 */
    width: 50%;
    height: 100%;
    top: 0;
    right: 0;
    position: absolute;
    /* 将开启3d空间，方便翻页后front和back的3d变换 */
    transform-style: preserve-3d;
    /* 奇点设为左边 */
    transform-origin: left center;
    /* 设置翻书（旋转）的运动时间，运动形式 */
    transition: 1s all ease;
    /* 提升层级否则会被盖住 */
    z-index: 2;
    /* 设置景深来更好的展示3D效果，并给旋转角度一个初始值，防止抖动发生 */
    transform: perspective(800px) rotateY(0deg);
}

/* 配置旋转页的前页 */
.page .front {
    /* 宽高与父级page一样 */
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    /* 将背景设成为与前一页相同的背景,并且只要右面的那部分，与页面左部分拼接 */
    background: url('../../assets/img/0.png') right top no-repeat;
    /* backface-visibility属性和3D transform效果相关，它决定当一个元素的背面面是否可见 */
    backface-visibility: hidden;
    /* 提升层级否则会被盖住 */
    z-index: 2;
}

/* 配置旋转页的后页 */
.page .back {
    /* 宽高与父级page一样 */
    width: 100%;
    height: 100%;
    /* 将背景设成为与下一页相同的背景,并且只要左面的那部分，与右部分的page2拼接 */
    background: url('../../assets/img/1.png') left top no-repeat;
    position: absolute;
    left: 0;
    top: 0;
    /* 这里设置将back进行水平方向上的镜像变化，因为当page旋转180°后， back显示的效果不对*/
    transform: scale(-1, 1);
    /* 改变层级避免盖住其他页面 */
    z-index: 1;
}

/* 配置pages展示区 */
#box .page2 {
    /* 因为其只在页面右侧展示所以宽为Box的一半 */
    width: 50%;
    height: 100%;
    top: 0;
    right: 0;
    position: absolute;
    /* 将背景设成为与下一页相同的背景,并且只要右面的那部分，与左部分（.page .back）拼接 */
    background: url('../../assets/img/1.png') right top no-repeat;
    /* 改变层级避免盖住其他页面 */
    z-index: 1;
}
#box:before {
    content: '';
    position: absolute;
    top: 0%;
    right: 0%;
    width: 0px;
    height: 0px;
    background-color: #fff;
    background: linear-gradient(
        225deg,
        #ffffffd1 45%,
        #d2d2d2 50%,
        #cacaca 56%,
        #ffffffd9 80%
    );
    -webkit-box-shadow: -1px 1px 1px #f0f0f0;
    box-shadow: 3px 7px 15px #d8d8d8;
    -webkit-transition-duration: 0.3s;
    transition-duration: 0.3s;
    -webkit-transition-property: width, height;
    transition-property: width, height;
    z-index: 20;
}
#box:hover:before {
    width: 100px;
    height: 100px;
}
</style>
