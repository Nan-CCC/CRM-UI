import { onMounted } from "vue";

export const setElementTheme = () => {
  onMounted(
    () => {
      setStyle('--el-color-primary', '#75b43b');
      setStyle('--el-text-color-regular', '#000000d9');
      setStyle('--el-text-color-placeholder', '#00000040');

    }
  );
}