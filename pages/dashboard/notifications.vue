<template>
    <div id="notifications" class="pt-[60px] pb-[40px]">
        <div class="row">
            <div class="container">
                <div class="dashboard-page-header">
                    <Breadcrumb :items="[
                        { path: '/dashboard/account', text: 'Account' },
                        { path: '/dashboard/notifications', text: 'Notifications' },
                    ]" />
                    <h2 class="dashboard-page-title">Notifications</h2>
                    <p class="dashboard-page-title-desc">
                        Keep track of all your payments and refunds.
                    </p>
                </div>

                <div class="hotel-tours-wrapper">
                    <div class="htw-tab-wrapper my-[60px]">
                        <ul class="htw-tabs flex-div gap-[20px]">
                            <li :class="{ 'active': activeTab === 'notifications' }"
                                @click="activeTab = 'notifications'">
                                <span>NOTIFICATIONS</span>
                            </li>
                            <li :class="{ 'active': activeTab === 'archive' }" @click="activeTab = 'archive'">
                                <span>ARCHIVE</span>
                            </li>
                            <li :class="{ 'active': activeTab === 'all' }" @click="activeTab = 'all'">
                                <span>ALL</span>
                            </li>
                        </ul>
                    </div>

                    <div class="htw-content">
                        <div v-if="activeTab === 'notifications'">
                            <div class="notifications-wrapper">
                                <NotificationItem
                                    icon="/icons/noti-1.svg"
                                    title="Kindly confirm Hotel booking"
                                    date="22-10-2023"
                                />
                                <NotificationItem
                                    icon="/icons/noti-2.svg"
                                    title="Kindly confirm Hotel booking - Kwara hotel"
                                    date="22-10-2023"
                                />
                                <NotificationItem
                                    icon="/icons/noti-1.svg"
                                    title="Kindly confirm Hotel booking - Edo hotel"
                                    date="22-10-2023"
                                    readStatus="read"
                                />
                            </div>

                            <div class="notification-btns-wrapper mt-[70px]">
                                <button class="mark-read-btn">Mark all as read</button>
                            </div>
                        </div>

                        <div v-if="activeTab === 'archive'">
                            <div class="empty-notification-wrapper py-[60px]">
                                <EmptyNotification />
                            </div>
                        </div>

                        <div v-if="activeTab === 'all'">
                            <div class="notifications-wrapper">
                                <NotificationItem
                                    icon="/icons/noti-2.svg"
                                    title="Kindly confirm Hotel booking"
                                    date="22-10-2023"
                                />
                                <NotificationItem
                                    icon="/icons/noti-2.svg"
                                    title="Kindly confirm Hotel booking - Kwara hotel"
                                    date="22-10-2023"
                                />
                                <NotificationItem
                                    icon="/icons/noti-1.svg"
                                    title="Kindly confirm Hotel booking - Edo hotel"
                                    date="22-10-2023"
                                />
                                <NotificationItem
                                    icon="/icons/noti-1.svg"
                                    title="Kindly confirm Hotel booking"
                                    date="22-10-2023"
                                />
                                <NotificationItem
                                    icon="/icons/noti-2.svg"
                                    title="Kindly confirm Hotel booking - Kwara hotel"
                                    date="22-10-2023"
                                />
                                <NotificationItem
                                    icon="/icons/noti-1.svg"
                                    title="Kindly confirm Hotel booking - Edo hotel"
                                    date="22-10-2023"
                                />
                            </div>

                            <div class="notification-btns-wrapper mt-[70px]">
                                <button class="mark-read-btn">Mark all as read</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "NotificationsPage",
    layout: "authLayout",
    data() {
        return {
            activeTab: "notifications"
        }
    },
}
</script>

<style></style>