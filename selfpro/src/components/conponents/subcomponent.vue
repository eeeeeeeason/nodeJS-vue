<template>
    <div>
        <!-- 1.0 提交评论 -->
        <div class="postCommentStyle">
            <h4>提交评论</h4>
            <div class="postCommentAreaStyle">
                <!-- 输入提交内容的框框 -->
                <textarea ref="textAreaRef" placeholder="请输入评论内容" rows="5">

                </textarea>

                <!-- 提交按钮 -->
                <mt-button @click=postinfo type="primary" size="large">提交评论</mt-button>
            </div>
        </div>

        <!-- 2.0 评论列表 -->
        <div class="commentListStyle">
            <h4>评论列表</h4>
            <div v-for="(item,index) in commentList" :key="index" class="commentItemStyle">
                <h5>{{item.content}}</h5>
                <p class="commentUserAndTimeStyle">
                    <span class="commentUserStyle">{{item.user_name}}</span>
                    <span class="commentTimeStyle">{{item.add_time | dateFmt}}</span>
                </p>
            </div>
            <!-- 加载更多 -->
            <mt-button class="loadMoreStyle" @click=loadMore type="danger" plain size="large">加载更多</mt-button>
        </div>
    </div>
</template>
<style scoped>
    .postCommentStyle,
    .commentListStyle {
        padding: 5px;
    }

    h4 {
        padding: 5px 5px 10px 5px;
        border-bottom: 1px solid rgba(92, 92, 92, 0.4);
    }

    h5 {
        color: black;
    }

    .commentItemStyle {
        padding: 5px;
        min-height: 70px;
        overflow: auto;
    }

    .commentUserAndTimeStyle {
        margin-top: 15px;
        color: #0094ff;
        border-bottom: 1px solid rgba(92, 92, 92, 0.4);
        padding-bottom: 5px;
        overflow: hidden;
    }

    .commentUserStyle {
        float: left;
        width: 50%;
    }

    .commentTimeStyle {
        float: right;
    }

    .loadMoreStyle {
        margin-top: 20px;
        margin-bottom: 10px;
    }
</style>
<script>
    import common from '../../common/common.js'
    import {
        Toast
    } from 'mint-ui'

    export default {
        data() {
            return {
                commentList: [],
                pageIndex: 1
            }
        },
        created() {
            this.getcommentdetail()
        },
        methods: {
            getcommentdetail() {

                const url = common.apihost + 'api/getcomments/' + this.myrouteid + "?pageindex=" + this.pageIndex
                this.$http.get(url).then((res) => {
                    //判断评论区是否为空
                    if(this.pageIndex==1){
                         if(res.body.message.length<=0){
                        Toast({
                            message: '还没有评论,可以抢占沙发...',
                            position: 'middle',
                            duration: 3000
                        })
                        return 
                    }}
                    //判断收到内容长短，决定是否继续获取
                    if (res.body.message.length <= 0) {
                        Toast({
                            message: '没有数据啦,已经到底啦...',
                            position: 'middle',
                            duration: 3000
                        })
                        return
                    }
                    console.log(res)
                    this.commentList = this.commentList.concat(res.body.message)
                })
            },
            postinfo() {
                //ref获取双向绑定元素信息
                const contentValue = this.$refs.textAreaRef.value
                //空字符串返回
                if(contentValue==null || contentValue.length<=0){
                Toast({
                    message: '请输入评论内容,但别瞎评论!!!',
                    position: 'middle',
                    duration: 3000
                })

                return 
            }
                const url = common.apihost + "api/postcomment/" + this.myrouteid
                this.$http.post(url, {
                    content: contentValue
                }, {
                    emulateJSON: true //querystring--fromdata
                }).then(res => {
                    this.$refs.textAreaRef.value = ''
                    Toast({
                        message: '提交成功',
                        position: 'middle',
                        duration: 3000
                    })
                    //重新加载第一页的数据
                    this.pageIndex = 1
                    this.getcommentdetail()
                }, err => {
                    console.log('评论失败')
                })
            },
            loadMore() {
                this.pageIndex++,
                    this.getcommentdetail()
            }
        },
        props: ['myrouteid'] //子组件用来接收父组件传递过来值的属性名称
    }
</script>