import { notificationTypes } from "@/constants";

const defaultMessageByType = (type) => {
  switch (type) {
    case notificationTypes.SUCCESS:
      return "Successful operation";
    default:
      return "Sorry something didn't work as expected";
  }
};
const Utils = {
  data() {
    return {};
  },
  methods: {
    createNotification(props) {
      let type = "success";
      let message = "Successful operation";
      if (props !== undefined) {
        type = props.type || "success";
        message = props.message || defaultMessageByType(type);
      }
      this.$toast[type](message, type.charAt(0).toUpperCase() + type.slice(1), {
        close: true,
        timeout: 3000,
        position: "topRight",
      });
    },
  },
};
export default Utils;
