import { http } from "src/services/http/client";
import { useGlobal } from "src/composables/useGlobal";
import { reactive, toRefs } from "vue";
import { Profile } from "src/composables/types/profile";

const { setLoading } = useGlobal();

interface State {
  profile: Profile;
}

const profileState: State = reactive({
  profile: {} as Profile,
});

export const useProfile = () => {
  const getUserProfile = async (username: string) => {
    setLoading(true);
    try {
      const { data } = await http.get<any, { data: { profile: Profile } }>(
        `/profiles/${username}`,
        {}
      );

      profileState.profile = { ...data.profile };
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  return {
    getUserProfile,
    ...toRefs(profileState),
  };
};
