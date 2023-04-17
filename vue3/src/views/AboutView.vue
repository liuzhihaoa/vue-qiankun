<!--
 * @Author: liuzhihao
 * @email: liuzhihao@hatech.com.cn
 * @Date: 2022-10-27 11:28:20
 * @LastEditors: liuzhihao
 * @LastEditTime: 2023-04-10 11:38:36
 * @description: 描述
-->
<!--
 * @Author: liuzhihao
 * @email: liuzhihao@hatech.com.cn
 * @Date: 2022-10-27 11:28:20
 * @LastEditors: liuzhihao
 * @LastEditTime: 2023-04-06 17:24:09
 * @description: 描述
-->
<!--
 * @Author: liuzhihao
 * @email: liuzhihao@hatech.com.cn
 * @Date: 2022-09-14 10:34:00
 * @LastEditors: liuzhihao
 * @LastEditTime: 2023-04-04 17:12:25
 * @description: 
-->
<template>
  <div class="todo-container">
    <div class="todo-wrap" ref="wrapRef">
      <button @click="changeLang('en')">切换语言</button>
      <Header @add="addToCount" />
      <List :todos="todos" @click="delCount" @updateTodo="updateTodo" ref="listRef">
        <template v-slot:test="slotProps"> my name is{{ slotProps.name }},性别{{ slotProps.sex }} </template>
        <template #> 测试 </template>
      </List>
      <Footer :todos="todos" />
      <button @click="changeCount('en')">切换语言</button>
    </div>
    <div><input type="text" v-model="keyword" /></div>
    {{ obj.bar }}
    <button @click="changeRaw">修改toRaw对象</button>
  </div>
</template>
<script lang="ts">
// 解构
import { defineComponent, reactive, toRefs, provide, computed, shallowReadonly, ref, onMounted, toRef, watch, watchEffect, nextTick, readonly, toRaw, markRaw } from "vue";
import Header from "@/components/Header.vue";
import List from "@/components/List.vue";
import Footer from "@/components/Footer.vue";
// 模块化
import { Todo } from "../types/todo";
import { useI18n } from "vue-i18n";
import { getMenuData, getUserInfo } from "../../api/user";

interface Person {
  name: string;
  age: number;
  readonly id: number;
  skill?: string;
}
interface RandomKey {
  [propName: string]: string;
}
interface ISum {
  (x: number, y: string): string;
}
export default defineComponent({
  name: "AboutView", //组件名称
  props: {
    // 接收父组件数据
  },
  components: {
    // 定义子组件
    Header,
    List,
    Footer,
  },
  setup(props, ctx) {
    console.log("ctx", ctx);
    const { locale } = useI18n();
    const state = reactive<{ todos: Todo[] }>({
      todos: [
        { id: 1, title: "张飞", isCompleted: false },
        { id: 2, title: "关羽", isCompleted: true },
        { id: 3, title: "刘备", isCompleted: false },
      ],
    });

    const tom: Person = {
      id: 1,
      name: "tom",
      age: 17,
    };
    tom.age = 3;
    const obj1: RandomKey = {
      a: "1",
      b: "2",
    };
    const add: ISum = (num1, s1) => {
      return num1 + s1;
    };
    add(1, "3");
    class Student implements Person {
      name = "jack";
      age = 18;
      id = 3;
    }
    class Animal {
      public name;
      private age;
      protected hobby;
      static skill: string = "run;";
      constructor(name: string, age: number, hobby: string) {
        this.name = name;
        this.age = age;
        this.hobby = hobby;
      }
    }
    const dog = new Animal("h", 5, "eat");
    class cat extends Animal {
      public friend;
      constructor(name: string, age: number, hobby: string, friend: string) {
        super(name, age, hobby);
        this.friend = friend;
        console.log(this.hobby);
      }
      eat() {
        console.log();
      }
    }
    const dealMenuData = async () => {
      const menuData = await getMenuData({ id: "9ed3a91559cc9cf1d75dd0a7efcd049f" });
    };
    const dealUserInfo = async () => {
      const userInfo = await getUserInfo({
        password: "BAudJRPosKMeCcvumy8ueauCEQuYhDn503szbfjuhZFfQhBuslyxW6Xkh46NmMQ32o7JWnaK/Sgsu/UvuuWQSocFCK0OLFd7UWC5kQ5NGUMFJRf6O1UURW+NBIlh3nukJflw4SvLb5U=",
        username: "bcms3@bcms3.com",
      });
    };
    //dealMenuData();
    // 通过ref获取dom元素
    const wrapRef = ref();
    onMounted(() => {
      console.log(wrapRef.value.children);
    });
    //toRef 基于响应式对象上的一个属性，创建一个对应的 ref
    const obj = reactive({
      foo: 1,
      bar: 3,
      cc: {
        aa: 6,
      },
    });

    const fooRef = toRef(obj, "foo");
    fooRef.value++;
    console.log(obj.foo);
    //toRefs
    const objToRefs = toRefs(obj);
    console.log(objToRefs);
    //watch
    const listRef = ref<any>();
    watch([state.todos, obj], ([newtodo, newobj], [todo, preobj]) => {
      console.log(6, listRef.value && listRef.value.$el);
      console.log(1, newtodo);
      console.log(2, toRefs(newobj));
    });
    //watchEffect
    watchEffect((onCleanUp) => {
      console.log(state.todos.length);
      const timer = setTimeout(() => {
        console.log("1s后执行");
      });
      onCleanUp(() => {
        clearTimeout(timer);
      });
    });
    // watchEffect防抖
    const keyword = ref<string>("");
    const debounce = (val: string, time: number) => {
      return setTimeout(() => {
        console.log(`用户输入：${val}`);
      }, time);
    };
    watchEffect((onCleanUp) => {
      const timer = debounce(keyword.value, 1000);
      onCleanUp(() => {
        clearTimeout(timer);
      });
      console.log("watchEffect", keyword.value);
    });
    //readonly
    const copy = readonly<Object>(obj);
    console.log("readonly", copy);
    //shallowReadonly
    const copy1 = shallowReadonly(obj);
    obj.cc.aa++;
    console.log("shallowReadonly", copy1);
    interface Person3 {
      name: string;
      age: number;
    }
    type K3 = keyof { [x: string]: Person3 };

    type NonNullable<T> = T extends null | number ? boolean : T;
    type TNonNullableExample2 = NonNullable<string | null>;
    type u<T> = T extends string | undefined ? number : T;
    type u1 = string | null; //联合类型会先做一轮计算合并子类

    interface User {
      name: string;
      age: number;
      sex: string;
    }
    const updateUser = (user: User, fields: Partial<User>): User => ({
      ...user,
      ...fields,
    });

    function buildName(a: string, b: number = 1) {}
    type PartialPointX = { x: number };
    //交叉类型
    type Point = PartialPointX & { y: number; x: string };
    //函数重载
    type Combinable = string | number;
    function ad(a: number, b: number): number;
    function ad(a: number, b: string): string;
    function ad(a: string, b: number): string;
    function ad(a: string, b: string): string;
    function ad(a: Combinable, b: Combinable) {
      if (typeof a === "string" || typeof b === "string") {
        return a.toString() + b.toString();
      }
      return a + b;
    }
    const result = ad("a", "b");
    result.split("");

    //extends泛型约束
    interface lengthWise {
      length: number;
    }
    //T中的属性必须包含lengthWise中的属性
    function loggingIdentity<T extends lengthWise>(arg: T): T {
      return arg;
    }
    loggingIdentity({ length: 3, value: 4 });

    const changeRaw = () => {
      //console.log("obj", obj);
      dealMenuData();
    };
    const addToCount = (e: Event) => {
      state.todos.unshift({
        id: Date.now(),
        title: (e.target as HTMLInputElement).value, //类型断言
        isCompleted: false,
      });
      //类型断言尖括号语法
      (<HTMLInputElement>e.target).value = "";
    };
    const delCount = (id: number) => {
      const index = state.todos.findIndex((v, i) => {
        return v.id === id;
      });
      state.todos.splice(index, 1);
    };
    const updateTodo = (todo: Todo) => {
      for (let v of state.todos) {
        if (v.id === todo.id) {
          v.isCompleted = todo.isCompleted;
          break;
        }
      }
    };
    //删除选中的数据
    const delCheckedTodos = () => {
      state.todos = state.todos?.filter((v) => {
        return !v.isCompleted;
      });
    };
    // provide('del', delCount)
    provide("delCheckedTodos", delCheckedTodos);
    //切换语言
    const changeLang = (lang: string) => {
      dealUserInfo();
      locale.value = lang;
    };
    return {
      ...toRefs(state),
      addToCount,
      delCount,
      updateTodo,
      changeLang,
      obj,
      wrapRef,
      listRef,
      keyword,
      changeRaw,
      obj1,
    };
  },
});
</script>
<style scoped>
.todo-container {
  width: 600px;
  margin: 0 auto;
}
.todo-container .todo-wrap {
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
}
</style>
