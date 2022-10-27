<!--
 * @Descripttion:
 * @version:
 * @Author: chunwen
 * @Date: 2021-11-11 21:37:36
 * @LastEditors: liuzhihao
 * @LastEditTime: 2022-09-28 14:30:01
-->
<template>
  <div class="router-view-container">
    <router-view v-slot="{ Component }">
      <keep-alive>
        <component :is="Component" />
      </keep-alive>
    </router-view>
  </div>
</template>
