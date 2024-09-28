module.exports = {
config: {
name: "ai", 
author: "Aljur Pogoy",
category: "Ai" 
},
onStart: () => {},
onChat: async function ({ message: { reply: r }, args: a, event: { body } })  {
if(!body?.toLowerCase().startsWith("ai"))
return;
require("axios").get(`${String.fromCharCode(104,116,116,112,115,58,47,47,116,111,111,108,115,46,98,101,116,97,98,111,116,122,46,101,117,46,111,114,103,47,116,111,111,108,115,47,111,112,101,110,97,105,63,113,61)}${a.slice(1).join(" ") || "hello"}`).then(({data:{result:_}})=>r(_)).catch(({message:_})=>r(_));
}
};
