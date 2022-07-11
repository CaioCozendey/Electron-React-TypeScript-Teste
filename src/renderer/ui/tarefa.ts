const app = new Realm.App({ id: "<Your App ID>"});

async function run(){

    await app.logIn(Realm.Credential.anonymous());

    const tarefa = {
        nome: "tarefa",
        properties:{
            _id: "int",
            nome: "string",
            descricao: "string",
        },
        primaryKey: "_id"
    };
}
