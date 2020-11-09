<template>
    <div id="reservationView">
        <section>
            <h3 class="title">예약하기</h3>
            <div>
                <SlidePicture
                    v-if="slideImage"
                    :imagesprops="slideImage"
                />
            </div>
            <div class="reservation">
                <div>
                    <div class="label">인원</div>
                    <v-text-field v-model="people" />
                    <div class="label">예약날짜</div>
                    <flat-pickr
                        v-model="date"
                        :config="config"
                        placeholder="예약날짜를 선택해주세요"
                        class="calendar"
                    />
                    <input
                        type="button"
                        @click="searchRoom"
                        value="검색"
                        class="searchRoom"
                    />
                    <br />
                    <div class="result" ref="result">
                        <p>요금</p>
                        <div class="label">{{ this.price }}</div>
                        <!-- <input type="button" @click="selectResult" value="선택"> -->
                    </div>
                </div>
            </div>
            <table v-if="search">
                <thead>
                    <tr>
                        <th><!--사진--></th>
                        <th>호실</th>
                        <th>크기</th>
                        <th>기준인원/최대인원</th>
                        <th>요금</th>
                    </tr>

                    <tr v-for="room in roomInfo" :key="room">
                        <th></th>
                        <th>{{room.roonumber}}</th>
                        <th>{{ room.size }}</th>
                        <th>{{ room.minPeople}}/{{ room.maxPeople }}</th>
                        <th>{{ room.price }}</th>
                    </tr>
                </thead>
            </table>
            <div class="reservation" v-show="isRoomEmpty">
            <!-- todo -->
            </div>
        </section>
    </div>
</template>

<script>
import SlidePicture from "@/components/SlidePicture";
import "flatpickr/dist/flatpickr.css";
import flatPickr from "vue-flatpickr-component";
import { Korean } from "flatpickr/dist/l10n/ko";
export default {
    components: {
        SlidePicture,
        flatPickr,
    },
    data() {
        return {
            people: 0,
            checkIn: "",
            checkOut: "",
            price: "",
            isRoomEmpty: false,
            isSearch: false,
            roomImage: [require("../assets/slide/room/1f-room.jpg")],
            slideImage: [],
            room: "",
            config: {
                wrap: false, // set wrap to true only when using 'input-group'
                altFormat: "Y - M - d",
                dateFormat: "Y-m-d",
                mode: "range",
                locale: Korean,
            },
            date: null,
        }
    },
    methods: {
        searchRoom() {
            console.log(this.date.split('~'))
            axios.post("/api/reservation/check", {
                people: this.people,
                checkIn: this.date.split('~')[0],
                checkOut: this.date.split('~')[1],
            })
            .then(res => {
                this.price = res.data.price;
                this.isRoomEmpty = res.data.isEmpty;
            });
        },
    }
};
</script>

<style scoped>
section {
    padding: 3em;
}

.reservation {
    background-color: rgb(248, 248, 248);
    width: 50em;
    margin: 2em;
}
.label {
    display: inline-block;
    width: 5em;
}
.searchRoom {
    padding: 8px;
    background: rgb(100, 100, 100);
    color: #fff;
}
.calendar {
    width: 14em;
    padding: 8px;
}
</style>
