import { ADMIN_PASSWORD } from "$env/static/private";

export const actions = {
  default: async ( event ) => {
    const data = await event.request.formData();
    const password = data.get("password");

    if (password === ADMIN_PASSWORD) {
        //work
        return {success: true};

    } else {
        //fail
        return {success: false, error: "Invalid password"};
    }
  }
};
