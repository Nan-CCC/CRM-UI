import { setStyle } from "element-plus/es/utils";
import { onMounted } from "vue";

export const setElementTheme = () => {
  onMounted(
    () => {
      setStyle('--el-color-primary', '#466c23');
      setStyle('--el-text-color-regular', '#466c23');
      setStyle('--el-text-color-placeholder', '#466c23');
      setStyle('--el-avatar-bg-color', ' #5e902f')
    }
  );
}