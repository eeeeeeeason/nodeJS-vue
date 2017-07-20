<template>
    <div class="numberStyle">
        <div @click="subtract" class="left">-</div>
        <div class="middle">{{count}}</div>
        <div @click="add" class="right">+</div>
    </div>
</template>
<style scoped>
    .left,
    .middle,
    .right {
        display: inline-block;
        border: 1px solid rgba(92, 92, 92, 0.3);
        text-align: center;
        vertical-align: top;
        height: 33px;
        line-height: 33px;
    }

    .left,
    .right {
        width: 35px;
    }

    .middle {
        width: 45px;
    }
</style>
<script>
    export default {
        data() {
            return {
                count: 1
            }
        },
        methods: {
            add() {

                this.count++
                    this.notify()

            },
            subtract() {
                if (this.count <= 1) {
                    return
                }
                this.count--
                    this.notify()

            },
            notify() {
                //传递值给父组件，点击该组件时触发事件，将count传给父组件
                this.$emit('numberChange', this.count)
            }
        }
    }
</script>