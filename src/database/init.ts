import user from "./models/user";

async function init () {
    const isDev = false;

    await user.sync({alter:isDev})
}
const dbInit = () =>{
    init();
}
export default init;