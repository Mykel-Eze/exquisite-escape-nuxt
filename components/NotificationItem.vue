<template>
    <div class="notification-item flex-div gap-4" :class="readStatus">
        <img :src="icon" alt="notificationIcon" class="noti-icon" />
        <div class="flex-grow">
            <div class="text-[24px] text-[#141414] pointer" @click="readNotification">{{ title }}</div>
            <div class="notification-body-txts text-[16px] pt-[10px] pb-[20px]" v-if="viewNotification">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae impedit corporis harum
                consequatur aliquam saepe at numquam velit? Perferendis vero beatae dignissimos alias hic illo
                harum aliquam quisquam nam ducimus.
            </div>
            <span class="pry-color text-[16px]">{{ date }}</span>
        </div>
        <div class="notifications-action-icons flex-div gap-[10px] min-w-[58px]">
            <button v-if="readStatus === 'unread'">
                <img src="@/assets/images/notification-2.svg" alt="icon">
            </button>
            <button>
                <img src="@/assets/images/archive.svg" alt="icon">
            </button>
        </div>
    </div>
</template>

<script>
export default {
    name: "NotificationItem",
    data() {
        return {
            viewNotification: false,
            readStatus: 'unread'
        }
    },
    props: {
        icon: {
            type: String,
            default: ""
        }, 
        date: {
            type: String,
            default: ""
        }, 
        title: {
            type: String,
            default: ""
        },
    },
    methods: {
        readNotification() {
            this.readStatus = "read";
            this.viewNotification = !this.viewNotification;
        }
    }
}
</script>

<style scoped>
    .notifications-action-icons button {
        background: transparent;
    }
    .notification-item.unread {
        background-color: #E5F6F5;
        border-color: transparent;
    }
</style>