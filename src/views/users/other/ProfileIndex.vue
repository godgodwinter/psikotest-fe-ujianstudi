<template>
    <div class="py-10 px-2 ">
        <div
            class="relative max-w-md mx-auto md:max-w-2xl  min-w-0 break-words bg-white w-full mb-6 rounded-lg border  rounded-xl pt-16 transition-shadow duration-500 ease-out cursor-pointer hover:shadow-xl">
            <div class="pt-4 px-6">
                <div class="flex flex-wrap justify-center">
                    <div class="w-full flex justify-center">
                        <div class="relative">
                            <img src="@/assets/img/avatar/user.png"
                                class="shadow-xl rounded-full align-middle border-none absolute -m-16 -ml-20 lg:-ml-16 max-w-[150px]" />
                        </div>
                    </div>
                    <div class="text-center mt-24 w-96">
                        <h3 class="text-2xl text-slate-700 font-bold leading-normal mb-1">
                            Username
                        </h3>
                        <div class="text-xs mt-0 mb-2 text-slate-400 font-bold uppercase">
                            <i class="fas fa-map-marker-alt mr-2 text-slate-400 opacity-75"></i>Kelas, Sekolah
                        </div>
                    </div>

                    <div class="md:py-2 p-4 lg:flex flex-wrap gap-4 w-96 mt-1">
                        <div class="w-full lg:w-full">
                            <div class="bg-white border rounded-lg px-4 py-4">
                                <div class="overflow-x-auto">
                                    <table class="table table-compact">
                                        <tbody>
                                            <!-- row 1 -->
                                            <tr>
                                                <td class="whitespace-nowrap w-1/12">No Induk</td>
                                                <td class="whitespace-nowrap w-1/12">:</td>
                                                <td class="whitespace-nowrap w-10/12">
                                                    aa
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>Nama</td>
                                                <td>:</td>
                                                <td>bb</td>
                                            </tr>
                                            <tr>
                                                <td>Jenis Kelamin</td>
                                                <td>:</td>
                                                <td>cc</td>
                                            </tr>
                                            <!-- row 3 -->
                                            <tr>
                                                <td>Sekolah</td>
                                                <td>:</td>
                                                <td>cc</td>
                                            </tr>
                                            <tr>
                                                <td>Kelas</td>
                                                <td>:</td>
                                                <td>aa</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

                <div class="mt-6 py-6 border-t border-slate-200 text-center">
                    <div class="flex flex-wrap justify-center">
                        <div class="w-full px-4">
                            <p class="font-light leading-relaxed text-slate-600 mb-4">
                                Pastikan data telah sesuai!
                            </p>
                            <span class="font-light text-sm text-red-400 hover:text-slate-400">Hubungi
                                admin
                                jika data tidak sesuai!</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
