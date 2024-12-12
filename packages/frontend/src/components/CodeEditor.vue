<template>
    <vue-monaco-editor class-name="min-h-200px" :value="props.value" :theme="props.theme" :language="props.language" :options="MONACO_EDITOR_OPTIONS" @mount="handleMount" />
</template>

<script lang="ts" setup>
import * as monaco from "monaco-editor"
import editorWorker from "monaco-editor/esm/vs/editor/editor.worker?worker"
import jsonWorker from "monaco-editor/esm/vs/language/json/json.worker?worker"
import cssWorker from "monaco-editor/esm/vs/language/css/css.worker?worker"
import htmlWorker from "monaco-editor/esm/vs/language/html/html.worker?worker"
import tsWorker from "monaco-editor/esm/vs/language/typescript/ts.worker?worker"
import { VueMonacoEditor, loader } from "@guolao/vue-monaco-editor"
self.MonacoEnvironment = {
  getWorker(_, label) {
    if (label === "json") {
      return new jsonWorker()
    }
    if (label === "css" || label === "scss" || label === "less") {
      return new cssWorker()
    }
    if (label === "html" || label === "handlebars" || label === "razor") {
      return new htmlWorker()
    }
    if (label === "typescript" || label === "javascript") {
      return new tsWorker()
    }
    return new editorWorker()
  }
}
loader.config({ monaco })
const props = withDefaults(
  defineProps<{
    value: string;
    language?: 'json' | 'html' | 'css' | 'scss' | 'less' | 'typescript' | 'javascript';
    theme?: 'vs-dark' | 'vs';
  }>(),
  {
    language: "javascript",
    theme: "vs-dark",
  }
);

const MONACO_EDITOR_OPTIONS = {
  automaticLayout: true,
  formatOnType: true,
  formatOnPaste: true,
}
const editor = shallowRef<monaco.editor.IStandaloneCodeEditor | null>(null)
const handleMount = (editorInstance : monaco.editor.IStandaloneCodeEditor) => {
  editor.value = editorInstance
}
/**封装功能方法

/** 格式化代码*/
const formatCode = () => {
  editor.value?.getAction("editor.action.formatDocument")?.run()
};

/**替换*/
const find = () => {
  editor.value?.getAction("actions.find")?.run();
};
/**查找*/
const replace = () => {
  editor.value?.getAction("editor.action.startFindReplaceAction")?.run();
};

/** 折叠 */
const foldAll = () => {
  editor.value?.getAction("editor.foldAll")?.run();
};
/** 展开*/
const unfoldAll = () => {
  editor.value?.getAction("editor.unfoldAll")?.run();
};

/** 快速修复*/
const quickFix = () => {
  editor.value?.getAction("editor.action.quickFix")?.run();
};

/** 显示代码提示*/
const triggerSuggest = () => {
  editor.value?.getAction("editor.action.triggerSuggest")?.run();
};

/** 设置只读模式*/
const setReadOnly = (readOnly: boolean) => {
  editor.value?.updateOptions({ readOnly });
};

/** 高亮代码*/
const highlightLine = (lineNumber: number) => {
  editor.value?.deltaDecorations([], [
    {
      range: new monaco.Range(lineNumber, 1, lineNumber, 1),
      options: { isWholeLine: true, className: "myHighlight" },
    },
  ]);
};

/** 跳转到行*/
const goToLine = (lineNumber: number, column: number = 1) => {
  editor.value?.revealPosition({ lineNumber, column });
  editor.value?.setPosition({ lineNumber, column });
};

/** 设置光标位置*/
const setCursorPosition = (lineNumber: number, column: number) => {
  editor.value?.setPosition({ lineNumber, column });
};

/** 替换内容*/
const replaceContent = (range: monaco.IRange, text: string) => {
  editor.value?.executeEdits("", [{ range, text }]);
};
onMounted(() => {
  setTimeout(() => {
    formatCode()
  }, 300)
})
defineExpose({
  formatCode,
  find,
  replace,
  foldAll,
  unfoldAll,
  quickFix,
  triggerSuggest,
  setReadOnly,
  highlightLine,
  goToLine,
  setCursorPosition,
  replaceContent,
});
</script>