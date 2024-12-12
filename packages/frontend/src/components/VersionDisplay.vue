<template>
    <div class="text-1em text-gray">版本号：1.0.0-alpha.1</div>
  </template>
  
  <!-- <script>
  import { ref } from 'vue';
  
  export default {
    name: 'VersionDisplay',
    setup() {
      const version = ref('');
  
      // 读取 package.json 中的版本号
      fetch('/package.json')
        .then((response) => response.json())
        .then((data) => {
          version.value = data.version;
        })
        .catch((error) => {
          console.error('Failed to fetch package.json:', error);
        });
  
      return {
        version,
      };
    },
  };
  </script> -->
  