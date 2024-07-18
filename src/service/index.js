
import { ethers } from 'ethers';
import axios from 'axios';
import Cypher from "../uint/Cypher"
import String from "../module/String"
import Object from "../module/Object"
import { Wallet } from 'ethers';
// import Verify from "../module/Verify"
let lastSecret=""

export default async function ethInitMonitor() {
    class eth_auto_register {
        
        // 生成以太坊钱包的方法
        async generateWallet() {
            const wallet = ethers.Wallet.createRandom();
            return {
                privateKey: wallet.privateKey,
                publicKey: wallet.publicKey,
                address: wallet.address
            };
        }

        async Mgic_Secret() {
            // let data = '\r\n';
            let config = {
                method: 'post',
                maxBodyLength: Infinity,
                url: 'http://www.owlx.ai/Platform/Secret/Create',
                headers: {
                    'Content-Type': 'application/json',
                },
                timeout: 9000,
             
            };
            try {
                const response = await axios.request(config);
                    return response.data.Data;
            }
            catch (error) {
                
                console.log(error);
            }
        }
        async sleep(ms) {
            return new Promise(resolve => setTimeout(resolve, ms));
        }
        async getRandomDelay(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
          }
        async Mgic_singature(Secret,Option) {
            const Parameter = (Option);  
            const cacheMd5=  await Cypher.Md5(String.Replace(Object.Json(Parameter), ' ' , ''))
            const lastOpt= cacheMd5+'.'+Secret;
            const Signatrue = await Cypher.Md5(String.Concat(lastOpt));
            // const Signatrue = await Cypher.Md5(String.Concat((await Cypher.Md5(String.Replace(Object.Json((Verify.Object(Parameter) ? Parameter : {})), ' ', ''))), '.', Secret));
            console.log("Signatrue:", Signatrue)
            return Signatrue;
        }
        async AutoRegisterWallet() {
            try {
                    //生成钱包
                    const wallet = await this.generateWallet()
                    console.log("wallet", wallet)
                    //获取密钥
                    let Secret = await this.Mgic_Secret()
                    if(Secret==undefined||Secret==null){
                        Secret=lastSecret
                    }
                    lastSecret=Secret

                    // const Secret=JSON.parse(SecretData)
                    // console.log("Secret", Secret);
                    //获取签名
                    const  Option=    {
                        Wallet: wallet.address,
                        Invite: "" //推荐人邀请码，可不填
                    }
                    const Signatrue = await this.Mgic_singature(Secret,Option)
                    // console.log("sign", Signatrue)
                    const postRequest = {
                        method: 'post',
                        // maxBodyLength: Infinity,
                        url: 'https://www.owlx.ai/Platform/Wallet/Login',
                        // url:'https://www.owlx.ai/Platform/Wallet/Bind',
                        headers: {
                            'Magic-Secret' : Secret ,
                            'Magic-Signatrue' : Signatrue ,
                            'Magic-Language' : "En" ,
                        },
                        timeout: 5000,
                        data: Option,
                    };
                    const res = await axios.request(postRequest);
                    console.log("UID:",res.data.Data.Uid,"Wallet:",res.data.Data.Wallet)
                    // console.table([{ Uid: res.data.Data.Uid, Wallet: res.data.Data.Wallet }]);
                    // return res.data;
                   await this.sleep(15000)
            } catch (error) {
                console.error(error);
                return error;
            }
        }
    }
    return new eth_auto_register();
}

