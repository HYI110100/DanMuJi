<script setup lang="ts">
import dayjs, { Dayjs } from 'dayjs';
import { getListForUserBillRecord } from '~/config/biliApiFn';
import { ListForUserBillRecordData } from '~/types/biliApi/pay';
import { toNumber } from '~/utils';

const listForUserBillRecord = getListForUserBillRecord();
const range = ref<[number, number] | null>(null);
const listForUserBillRecordData = ref<ListForUserBillRecordData[]>([]);
const totalSpending = computed(() => {
    return listForUserBillRecordData.value.filter(x => x.type === 1 && x.customerName === '直播平台').reduce((acc, cur) => {
        return acc + toNumber(cur.payAmount);
    }, 0);
});
const totalCount = ref(0);

async function fetchBillRecords(page: number, pageSize: number, startTime: string, endTime: string) {
    try {
        const response = await listForUserBillRecord.start({
            currentPage: page,
            pageSize: pageSize,
            traceId: Date.now(),
            timestamp: Date.now(),
            endTime: endTime,
            beginTime: startTime,
        });

        listForUserBillRecordData.value.push(...response.result);

        // 如果当前页的数据数量等于 pageSize，并且总数据量小于100，则继续请求下一页
        if (page < response.page.totalPage) {
            // 添加随机延迟
            const randomDelay = Math.floor(Math.random() * 5000) + 3000; // 随机延迟 500ms 到 1500ms
            await new Promise(resolve => setTimeout(resolve, randomDelay));
            await fetchBillRecords(page + 1, pageSize, startTime, endTime);
        }
    } catch (error) {
        console.error('Failed to fetch bill records:', error);
    }
}
async function fetchMonthlyBillRecords(startDate: Dayjs, endDate: Dayjs) {
    const initData = await listForUserBillRecord.start({
        currentPage: 1,
        pageSize: 1,
        traceId: Date.now(),
        timestamp: Date.now(),
        endTime: dayjs(endDate).endOf('D').format('YYYY-MM-DD HH:mm:ss'),
        beginTime: dayjs(startDate).startOf('D').format('YYYY-MM-DD HH:mm:ss'),
    })
    totalCount.value = initData.page.totalCount

    while (startDate.isBefore(endDate)) {
        const monthStart = startDate.startOf('month').format('YYYY-MM-DD HH:mm:ss')
        const monthEnd = dayjs(startDate).isAfter(dayjs(endDate)) ? dayjs(endDate).format('YYYY-MM-DD HH:mm:ss') : startDate.endOf('month').format('YYYY-MM-DD HH:mm:ss');
        await fetchBillRecords(1, 15, monthStart, monthEnd)
        startDate = startDate.add(1, 'month');
    }
}

function handleDateChange() {
    if (!range.value) {
        return;
    }
    const [start, end] = range.value;
    const startTime = dayjs(start).startOf('D')
    const endTime = dayjs(end).endOf('D')

    // 清空之前的数据
    listForUserBillRecordData.value = [];

    // 开始获取数据
    fetchMonthlyBillRecords(startTime, endTime);
}
</script>

<template>
    <div class="p-3">
        获取用户账单记录
        <n-date-picker v-model:value="range" type="daterange" clearable @update:value="handleDateChange" />
        <div>总花费: {{ totalSpending }}</div>
        <div>进度: {{ listForUserBillRecordData.length }}/{{ totalCount }} - {{ ((listForUserBillRecordData.length /
            totalCount) * 100).toFixed(2) }}%</div>
    </div>
</template>