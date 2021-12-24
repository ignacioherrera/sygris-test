import api from "@/api/api";
import { apiEndpoints } from "@/constants";
export default {
  list() {
    return api.get(apiEndpoints.NODES);
  },
  get(id) {
    return api.get(apiEndpoints.NODES, { id: id });
  },
  create(params) {
    return api.post(apiEndpoints.NODES, params);
  },
  update(params) {
    return api.put(apiEndpoints.NODES, params);
  },
  delete(id) {
    return api.delete(apiEndpoints.NODES, { id: id });
  },
};
