import { reactive, toRefs } from "vue";
import { LoadingBar } from 'quasar';

interface GlobalState {
  loading: boolean;
  buttonLoading: boolean;
}

const globalState = reactive<GlobalState>({
  loading: true,
  buttonLoading: false,
});

export const useGlobal = () => {
  const setLoading = (val: boolean) => {
    globalState.loading = val;
    if(val)
      LoadingBar.start()
    else
      LoadingBar.stop()
  };
  const setButtonLoading = (val: boolean) => {
    
    globalState.buttonLoading = val;
  };

  return {
    ...toRefs(globalState),
    setLoading,
    setButtonLoading,
  };
};
