<script setup>
import Modal from "./components/Modal.vue";
import FormInput from "./components/FormInput.vue";
import FormCheckbox from "./components/FormCheckbox.vue";
import Button from "./components/Button.vue";
import {Icon} from "@iconify/vue";
import {folders} from "./utils/dummy-data.js";
import {onMounted, reactive, ref} from "vue";
import ApiClient from "./utils/api-client.js";
import dayjs from "dayjs";

// フォルダ
const dummyFolders = reactive(folders);

// 割り振るIDを定義
const projectIdArray = folders.map(project => project.id);
const maxId = projectIdArray.reduce((max, id) => {
  return id > max ? id : max;
}, 0);
const idRef = ref(maxId + 1);

// フォルダ追加
const folderModalShowRef = ref(false);
const createFolderErrorMsg = ref('');
const newFolder = reactive({
  name: '',
  isImportant: false,
  isPrivate: false
});
const openCreate = () => {
  createFolderErrorMsg.value = '';
  newFolder.name = '';
  newFolder.isImportant = newFolder.isPrivate = false;
  folderModalShowRef.value = true;
};
const createFolder = () => {
  createFolderErrorMsg.value = '';
  if (newFolder.name.trim() === '') {
    createFolderErrorMsg.value = '入力してください';
    return;
  }
  dummyFolders.push({
    ...newFolder,
    id: idRef.value
  });
  folderModalShowRef.value = false;
};

// qiita記事の取得
const qiitaList = ref([]);
const qiitaApi = new ApiClient('https://qiita.com/api/v2/items');
onMounted(() => {
  qiitaApi.apiGet().then(res => {
    qiitaList.value = res.data;
  });
})
</script>

<template>
  <div id="menu">
    <div id="menu-header">
      <div class="menu-title">
        <h1>試験課題</h1>
        <span class="avatar"></span>
      </div>
      <form class="menu-search" @submit.prevent>
        <button type="submit">
          <Icon icon="fa-solid:search" :inline="true"/>
        </button>
        <input type="search"/>
      </form>
      <div class="menu-buttons">
        <div class="icon">
          <button class="hover:bg-gray-50 border rounded-full w-16 h-16">
            <Icon icon="ic:outline-home" width="32" height="32"/>
          </button>
          <span>ホーム</span>
        </div>
        <div class="icon">
          <button class="hover:bg-gray-50 border rounded-full w-16 h-16">
            <Icon icon="ic:outline-add-alert" width="32" height="32"/>
          </button>
          <span>通知</span>
        </div>
        <div class="icon">
          <button class="hover:bg-gray-50 border rounded-full w-16 h-16">
            <Icon icon="ic:outline-settings" width="32" height="32"/>
          </button>
          <span>設定</span>
        </div>
      </div>
    </div>
    <div id="menu-main">
      <div class="menu-folder-title">
        <h4>フォルダ一覧</h4>
        <button class="bg-blue-500 hover:bg-blue-400 text-white text-sm rounded p-2" @click="openCreate">フォルダ作成</button>
      </div>
      <ul class="menu-folder-list">
        <li v-for="folder of dummyFolders" :key="folder.id">
          <div class="folder-list-box" :class="folder.isImportant ? 'border-l-orange' : 'border-l-blue'">
            <span>{{ folder.name }}</span>
            <Icon v-if="folder.isPrivate" icon="ic:baseline-key"/>
          </div>
        </li>
      </ul>
    </div>
  </div>
  <div id="content">
    <div id="content-header">
      <h1 class="content-header-title">Qiita記事を表示</h1>
    </div>
    <div id="content-main">
      <div class="qiita-list">
        <ul>
          <li></li>
          <li>タイトル</li>
          <li>担当者</li>
          <li>公開日</li>
          <li>関連ノート</li>
          <li>編集</li>
        </ul>
        <ul v-for="article of qiitaList" :key="article.id">
          <li class="qiita-list-badge">
            <span>NEW</span>
          </li>
          <li class="qiita-list-title">
            <a :href="article.url" target="_blank" rel="noopener noreferrer">
              {{ article.title }}
            </a>
          </li>
          <li class="qiita-list-name">
            <span class="avatar"></span>
            <span>
              {{ article.user.name }}
            </span>
          </li>
          <li class="qiita-list-date">
            {{ dayjs(article.created_at).format('YYYY/MM/DD') }}
          </li>
          <li class="qiita-list-note">
            <span>
              <Icon icon="ic:outline-sticky-note-2" :inline="true"/>
            </span>
          </li>
          <li class="qiita-list-edit">
            <span>
              <Icon icon="ic:twotone-edit" :inline="true"/>
            </span>
          </li>
        </ul>
      </div>
    </div>
  </div>
  <Modal v-model="folderModalShowRef">
    <template #header>
      <h4 class="create-folder-title">新しいフォルダを作成する</h4>
    </template>
    <template #main>
      <div class="create-folder-main">
        <form @submit.prevent>
          <FormInput v-model="newFolder.name" unique-str="folder-name" :error-msg="createFolderErrorMsg">
            フォルダ名
          </FormInput>
          <FormCheckbox v-model="newFolder.isImportant" unique-str="folder-is-important">
            このフォルダは重要ですか
          </FormCheckbox>
          <FormCheckbox v-model="newFolder.isPrivate" unique-str="folder-is-private">
            このフォルダを公開しますか
          </FormCheckbox>
        </form>
      </div>
    </template>
    <template #footer>
      <div class="create-folder-buttons">
        <Button @click="createFolder">作成</Button>
        <Button color="gray" @click="folderModalShowRef = false">閉じる</Button>
      </div>
    </template>
  </Modal>
</template>

<style lang="scss" scoped>
// side menu
#menu-header {
  padding: 1rem;
}

.menu-title {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;

  h1 {
    font-weight: bold;
  }
}

.avatar {
  height: 25px;
  width: 25px;
  background-image: url("./assets/avater.png");
  background-position: 50% 50%;
  background-repeat: no-repeat;
  background-size: 30px;
  border: 1px solid lightblue;
  border-radius: 9999px;
}

.menu-search {
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid darkgray;
  border-radius: 2px;
  margin-bottom: 1rem;

  &:focus-within {
    border: 1px solid black;
  }

  button {
    border-width: 0;
    padding: 0.25rem;
    cursor: pointer;
    font-size: 1rem;
  }

  input {
    border-width: 0;
    padding: 0.25rem 0;
    font-size: 1rem;
    outline: none;
  }
}

.menu-buttons {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 0 auto;

  .icon {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;

    button {
      width: 4rem;
      height: 4rem;
      border-width: 1px;
      border-radius: 9999px;
      background-color: white;
      cursor: pointer;

      &:hover {
        background-color: rgb(245, 245, 245);
      }
    }

    span {
      font-size: small;
    }
  }
}

#menu-main {
  padding: 1rem;
  display: flex;
  flex-direction: column;
}

.menu-folder-title {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;

  button {
    padding: 0.25rem 0.5rem;
    background-color: rgb(59, 130, 246);
    border-radius: 2rem;
    border-width: 0;
    cursor: pointer;
    color: white;
    font-size: xx-small;

    &:hover {
      background-color: rgb(96, 165, 250);
    }

    &::before {
      content: '+';
      margin-right: 0.1rem;
    }
  }
}

.menu-folder-list {
  flex-grow: 1;
  overflow-y: auto;
}

.folder-list-box {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 1rem;
  border: 1px solid gray;
  border-left-width: 8px;
  border-top-right-radius: 0.25rem;
  border-bottom-right-radius: 0.25rem;
  padding: 1rem 0.5rem;
  cursor: pointer;

  span {
    flex-grow: 1;
  }
}

.border-l-orange {
  border-left-color: orange;
}

.border-l-blue {
  border-left-color: blue;
}

// folder list
.create-folder-title {
  font-size: large;
  font-weight: bold;
  padding: 0.5rem 1rem 0;
}

.create-folder-main {
  padding: 0 1rem;

  form {
    display: flex;
    flex-direction: column;
    gap: 2rem;
  }
}

.create-folder-buttons {
  display: flex;
  flex-direction: row;
  gap: 1rem;
  justify-content: end;
}

// header
#content-header {
  position: relative;
  padding-left: 2rem;
}

.content-header-title {
  position: absolute;
  top: 50%;
  transform: translate(0, -50%);
  font-size: large;
  font-weight: bold;
}

#content-main {
  display: flex;
  flex-direction: column;
  padding: 2rem 1rem 2rem 2rem;
}

.qiita-list {
  flex-grow: 1;
  border: 1px solid darkgray;
  border-radius: 2px;
  overflow-y: auto;

  ul {
    display: flex;
    flex-direction: row;
    list-style: none;
    align-items: center;

    li:nth-child(2) {
      flex-basis: 50%;
    }

    li:not(:nth-child(2)) {
      flex-basis: 10%;
    }
  }

  ul:first-child {
    background-color: lightgray;
    font-size: small;

    li {
      padding: 1rem 0;
      font-weight: normal;
      text-align: center;
    }
  }

  ul:not(:first-child) {
    border-top: 1px solid darkgray;
    border-bottom: 1px solid darkgray;

    li {
      padding: 1.5rem 0.25rem;
    }
  }
}

.qiita-list-badge {
  text-align: center;

  span {
    padding: 0.25rem 2rem;
    border-radius: 2px;
    background-color: orange;
    color: orangered;
    font-size: small;
    font-weight: bold;
  }
}

.qiita-list-title {
  a {
    font-weight: bold;
    text-decoration: none;
    color: rgb(30, 30, 30);
  }
}

.qiita-list-name {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 0.25rem;

  .avatar {
    height: 20px;
    width: 20px;
  }
}

.qiita-list-date {
  text-align: center;
}

.qiita-list-note, .qiita-list-edit {
  text-align: center;

  span {
    padding: 0.5rem 1.5rem;
    border-radius: 999px;
    background-color: rgb(225, 234, 255);
    color: blue;
    cursor: pointer;
  }
}
</style>
