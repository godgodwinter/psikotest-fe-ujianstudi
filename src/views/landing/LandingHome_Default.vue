<script setup>
import { defineAsyncComponent } from "vue"
// import Logo from "@/components/babeng/icons/babeng-logo.vue";
// import MenuIcon from "@/components/babeng/icons/babeng-menu.vue";
// import PlayButton from "@/components/babeng/icons/babeng-play-button.vue";
// import BriefcaseIcon from "@/components/babeng/icons/babeng-briefcase.vue";

const Logo = defineAsyncComponent(() =>
    import('@/components/babeng/icons/babeng-logo.vue')
)
const MenuIcon = defineAsyncComponent(() =>
    import('@/components/babeng/icons/babeng-menu.vue')
)
const PlayButton = defineAsyncComponent(() =>
    import('@/components/babeng/icons/babeng-play-button.vue')
)
const BriefcaseIcon = defineAsyncComponent(() =>
    import('@/components/babeng/icons/babeng-briefcase.vue')
)
// import LocationIcon from "@/components/babeng/icons/babeng-location.vue";
// import ProfileIcon from "@/components/babeng/icons/babeng-profile.vue";
// import MenuIcon from "@/components/icon/menu.svg";
// import IconCommunity from "@/components/icons/IconCommunity.vue"

const menu = ["Home", "About us", "Blogs", "Contact"];
const features = [
    {
        // icon: `${BriefcaseIcon}`,
        title: "Work-Life Balance",
        description:
            "Many remote jobs also come with flexible schedules, which means that workers can start and end their day as they choose.",
        color: "bg-orange",
    },
    {
        // icon: LocationIcon,
        title: "Work Anywhere",
        description:
            "Having access to a broader range of job opportunities that aren’t limited by geographic location. This can be especially helpful.",
        color: "bg-blue",
    },
    {
        // icon: ProfileIcon,
        title: "Improved Inclusivity",
        description:
            "Remote work enables companies to embrace diversity and inclusion by hiring people from different backgrounds.",
        color: "bg-pink",
    },
];
</script>
<template>
    <div class="w-full min-h-screen font-sans text-gray-900">
        <div class="bg-gradient-to-b from-[#FEE6F7] to-white">
            <img :src="`/img/blob.svg`" alt="" class="absolute top-0 right-0 pointer-events-none" />
            <div class="px-6 mx-auto max-w-6xl">
                <div class="flex justify-between items-center py-10">
                    <Logo />
                    <nav class="hidden md:flex md:items-center md:space-x-10">
                        <a v-for="item in menu" href="#" class="text-gray-700 hover:text-gray-900">
                            {{ item }}
                        </a>
                        <a href="#" class="font-semibold text-indigo-600 hover:text-indigo-800">
                            Try now
                        </a>
                    </nav>
                    <button class="p-4 md:hidden">
                        <MenuIcon class="w-6 h-6 text-gray-800" />
                    </button>
                </div>
            </div>
            <div class="px-6 mx-auto max-w-6xl">
                <div class="flex flex-col-reverse items-center md:flex-row lg:items-end">
                    <div class="pt-24 pr-8 pb-24 text-center md:pb-12 md:w-1/2 md:text-left">
                        <h1 class="relative z-10 text-5xl font-bold md:text-6xl font-display">
                            Learn the
                            <span
                                class="relative after:content-[url(/img/scratch.svg)] after:absolute after:-top-2 after:-right-6 after:-z-1">
                                best
                            </span>
                            ways for staying
                            <span
                                class="relative after:content-[url(/img/decoration.svg)] after:absolute after:-bottom-2 after:-right-8 after:-z-1">
                                productive
                            </span>
                        </h1>
                        <p class="pt-8 text-lg leading-relaxed text-gray-500 md:max-w-md md:text-xl">
                            Working at home is definitely a convenient option and makes sense in these
                            unprecedented times.
                        </p>
                        <div class="flex justify-center items-center pt-12 space-x-6 md:justify-start">
                            <button
                                class="flex justify-center items-center py-4 px-8 font-bold tracking-wide leading-7 text-white bg-blue-600 rounded-xl hover:shadow-xl">
                                Get Tips
                            </button>
                            <button class="flex items-center">
                                <PlayButton class="drop-shadow-lg hover:drop-shadow-xl" />
                                <span class="pl-4 font-bold tracking-wide">Learn More</span>
                            </button>
                        </div>
                    </div>
                    <div class="flex items-end w-1/2 border-b border-gray-400">
                        <img :src="`/img/illustration.svg`" alt="" />
                    </div>
                </div>
            </div>
        </div>
        <div class="bg-gray-50">
            <div class="py-12 px-6 mx-auto max-w-6xl">
                <div class="flex flex-col gap-5 md:flex-row">
                    <div v-for="feature in features"
                        class="flex flex-col p-8 space-y-4 bg-white rounded-lg border border-gray-200 transition-shadow duration-500 ease-out cursor-pointer hover:shadow-xl">
                        <div class="flex items-center space-x-3">
                            <div class="relative">
                                <span :class="feature.color"
                                    class="absolute top-0 left-4 w-3 h-3 rounded-full opacity-50" />
                                <!-- <Component :is="feature.icon" class="relative" /> -->
                                <BriefcaseIcon />
                            </div>
                            <div class="relative">
                                <span :class="feature.color" class="absolute right-0 bottom-1 w-12 h-1.5 opacity-60" />
                                <h2 class="relative text-xl font-display">{{ feature.title }}</h2>
                            </div>
                        </div>
                        <p class="text-sm leading-relaxed text-gray-500">{{ feature.description }}</p>
                    </div>
                </div>
            </div>
        </div>
        <div>
            <div class="p-10 mx-auto max-w-6xl">
                <div class="flex flex-col gap-5 md:flex-row">
                    <div
                        class="flex flex-col p-8 space-y-4 bg-white rounded-lg border  border-gray-200 transition-shadow duration-500 ease-out cursor-pointer hover:shadow-xl">
                        <div class="flex items-center space-x-3">
                            <div class="relative">
                                <span class="absolute right-0 bottom-1 w-12 h-1.5 opacity-60 bg-blue" />

                                <svg class="relative" width="26" height="26" viewBox="0 0 26 26" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M13 15.3508C10.6925 15.3508 8.8075 13.4767 8.8075 11.1583C8.8075 8.83999 10.6925 6.97665 13 6.97665C15.3075 6.97665 17.1925 8.85082 17.1925 11.1692C17.1925 13.4875 15.3075 15.3508 13 15.3508ZM13 8.60165C11.5917 8.60165 10.4325 9.74999 10.4325 11.1692C10.4325 12.5883 11.5808 13.7367 13 13.7367C14.4192 13.7367 15.5675 12.5883 15.5675 11.1692C15.5675 9.74999 14.4083 8.60165 13 8.60165Z"
                                        fill="#292D32" />
                                    <path
                                        d="M13 24.6567C11.3967 24.6567 9.78251 24.05 8.52584 22.8475C5.33001 19.7708 1.79834 14.8633 3.13084 9.02416C4.33334 3.72666 8.95918 1.35416 13 1.35416C13 1.35416 13 1.35416 13.0108 1.35416C17.0517 1.35416 21.6775 3.72666 22.88 9.03499C24.2017 14.8742 20.67 19.7708 17.4742 22.8475C16.2175 24.05 14.6033 24.6567 13 24.6567ZM13 2.97916C9.84751 2.97916 5.79584 4.65832 4.72334 9.38166C3.55334 14.4842 6.76001 18.8825 9.66334 21.6667C11.5375 23.4758 14.4733 23.4758 16.3475 21.6667C19.24 18.8825 22.4467 14.4842 21.2983 9.38166C20.215 4.65832 16.1525 2.97916 13 2.97916Z"
                                        fill="#292D32" />
                                </svg>
                            </div>
                            <div class="relative">
                                <span class="absolute right-0 bottom-1 w-12 h-1.5 opacity-60 bg-blue" />
                                <h2 class="relative text-xl font-display">This is Header</h2>
                            </div>

                        </div>

                        <p class="text-sm leading-relaxed text-gray-500">Lorem ipsum dolor sit amet consectetur
                            adipisicing elit. Magni incidunt cupiditate sunt provident eaque dolorem facilis recusandae
                            perspiciatis, eos unde necessitatibus consequuntur expedita tempore amet autem consectetur.
                            Aspernatur, harum at?</p>
                    </div>
                    <div
                        class="flex flex-col p-8 space-y-4 bg-white rounded-lg border  border-gray-200 transition-shadow duration-500 ease-out cursor-pointer hover:shadow-xl">
                        <div class="flex items-center space-x-3">
                            <div class="relative">
                                <span class="absolute right-0 bottom-1 w-12 h-1.5 opacity-60 bg-blue" />

                                <svg class="relative" width="26" height="26" viewBox="0 0 26 26" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M13 15.3508C10.6925 15.3508 8.8075 13.4767 8.8075 11.1583C8.8075 8.83999 10.6925 6.97665 13 6.97665C15.3075 6.97665 17.1925 8.85082 17.1925 11.1692C17.1925 13.4875 15.3075 15.3508 13 15.3508ZM13 8.60165C11.5917 8.60165 10.4325 9.74999 10.4325 11.1692C10.4325 12.5883 11.5808 13.7367 13 13.7367C14.4192 13.7367 15.5675 12.5883 15.5675 11.1692C15.5675 9.74999 14.4083 8.60165 13 8.60165Z"
                                        fill="#292D32" />
                                    <path
                                        d="M13 24.6567C11.3967 24.6567 9.78251 24.05 8.52584 22.8475C5.33001 19.7708 1.79834 14.8633 3.13084 9.02416C4.33334 3.72666 8.95918 1.35416 13 1.35416C13 1.35416 13 1.35416 13.0108 1.35416C17.0517 1.35416 21.6775 3.72666 22.88 9.03499C24.2017 14.8742 20.67 19.7708 17.4742 22.8475C16.2175 24.05 14.6033 24.6567 13 24.6567ZM13 2.97916C9.84751 2.97916 5.79584 4.65832 4.72334 9.38166C3.55334 14.4842 6.76001 18.8825 9.66334 21.6667C11.5375 23.4758 14.4733 23.4758 16.3475 21.6667C19.24 18.8825 22.4467 14.4842 21.2983 9.38166C20.215 4.65832 16.1525 2.97916 13 2.97916Z"
                                        fill="#292D32" />
                                </svg>
                            </div>
                            <div class="relative">
                                <span class="absolute right-0 bottom-1 w-12 h-1.5 opacity-60 bg-blue" />
                                <h2 class="relative text-xl font-display">This is Header</h2>
                            </div>

                        </div>

                        <p class="text-sm leading-relaxed text-gray-500">Lorem ipsum dolor sit amet consectetur
                            adipisicing elit. Magni incidunt cupiditate sunt provident eaque dolorem facilis recusandae
                            perspiciatis, eos unde necessitatibus consequuntur expedita tempore amet autem consectetur.
                            Aspernatur, harum at?</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
