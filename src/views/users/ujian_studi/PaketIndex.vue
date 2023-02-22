
<template>
    <div class="p-4">
        <div class="alert alert-error shadow-lg">
            <div>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                    class="stroke-current flex-shrink-0 w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                <span>Ujian aktif tidak ditemukan!</span>
            </div>
        </div>
    </div>
    <div class="py-10 p-4 mx-2 rounded-lg border">
        <div class="overflow-x-auto">
            <table class="table table-compact w-full">
                <thead>
                    <tr>
                        <th></th>
                        <th>Judul</th>
                        <th>Status</th>
                        <th>Waktu Pengerjaan</th>
                        <th>Jumlah Soal</th>
                        <th>Tipe</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th>1</th>
                        <th>aaa</th>
                        <td>
                            <button class="btn btn-info btn-sm">LANJUTKAN</button>
                            <!-- <button class="btn btn-warning" v-else-if="item.status == 'selesai'">SELESAI</button>
            <button class="btn btn-primary" v-else @click="doMulai(item.id, item.tipe)">MULAI</button> -->

                        </td>
                        <td>11 menit</td>
                        <td>bb soal</td>
                        <td>zz</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>
