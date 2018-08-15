import path from 'path';

export default class setting{
    constructor(){
        let baseDir = path.join(process.cwd(),'..'+path.sep+'..'+path.sep+'..'+path.sep+'..'+path.sep+'..'+path.sep)

        // Websocket connection parameters
        this.websocket_host = 'localhost';
        this.websocket_port = '8081';

        // Protobuf files location
        this.protobuf_files_root_location = baseDir+'imports'+path.sep+'protobuf';

        // PrvKey file storage location
        this.prvkey_file_location = baseDir + 'users';

        // Certificate file storage location
        this.certificate_file_location = baseDir+'users';


        //Chaincode ID
        //this.chainCodeId_name='1add8db6a80ea8c2da96a766918a245e7e51c642da57c90277be3ad24497c75e';
        this.chainCodeId_name='0bfbe2faf858dd495e712fb0f897dd66082f06b879fa21a80fcc2acbc199b8d7';
        this.chainCodeId_path='path';

        this.fileSizeBase = 5*1024*1000 // 5M大小
    }
}