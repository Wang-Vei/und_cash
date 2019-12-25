/* eslint-disable */
import Web3 from 'web3';
import { CONFIG } from "@/assets/js/config.js";
//挂卖单
export async function sellOrder(merchantID, gateWay, price, fee, cashAmount, orderInfoA) {
    let account = await ethAccounts();
    let gas = await getGasPrice();
    gas = Number(gas) + Number(CONFIG.GasExtra);
    return new Promise(function(resolve, reject) {
        Contract_c2c.methods.beginOrder(merchantID, gateWay, price, fee, cashAmount, orderInfoA).send({ from: account, gasPrice: gas, gas: CONFIG.GasLimit }).on('confirmation', function(error, transactionHash) {
            if (error) {
                return reject(error);
            }
            return resolve(transactionHash);
        })
    })
}

//取消挂单
export async function cancelOrder(orderID) {
    let account = await ethAccounts();
    let gas = await getGasPrice();
    gas = Number(gas) + Number(CONFIG.GasExtra);
    return new Promise(function(resolve, reject) {
        Contract_c2c.methods.cancelOrderByCustomer(orderID).send({ from: account, gasPrice: gas, gas: CONFIG.GasExtra2 }).on('confirmation', function(error, transactionHash) {
            if (error) {
                return reject(error);
            }
            return resolve(transactionHash);
        })
    });
}




//待付款
export async function awaitPay(num, txt) {
    let res = await Contract_c2c.methods.completeOrder(num, txt).call();
}

//申诉
export async function appealOrder(orderID, txt) {
    let res = await Contract_c2c.methods.appealOrder(orderID, txt).call();
}



//关闭申诉
export async function closeAppealOrder(orderID, txt) {
    let res = await Contract_c2c.methods.closeAppealOrder(orderID, txt).call();
}

//查询所有订单
export async function queryAllOrder(addr, status, gateWay, Caddr, start, limit) {
    let res = await Contract_c2c.methods.queryAllOrder(addr, status, gateWay, Caddr, start, limit).call();
    return res;
}

export async function orders(id) {
    let res = await Contract_c2c.methods.orders(id).call();
    return res;
}

export async function checker(gateway) {
    let res = await Contract_c2c.methods.checker(gateway).call();
    return res;
}

//获取地址
export async function ethAccounts() {
    return new Promise(function(resolve, reject) {
        web3.eth.getAccounts(function(err, accounts) {
            if (err) {
                return reject(err);
            } else {
                return resolve(accounts[0]);
            }
        });
    });
}

//获取当前gas
export async function getGasPrice() {
    let gas = await web3.eth.getGasPrice();
    return gas;
}

//获取UNDT余额
export async function balance_undt(addr) {
    let balance_num = await Contract_undt.methods.balanceOf(addr).call();
    balance_num = web3.utils.fromWei(balance_num, CONFIG.undt_wei);
    balance_num = Number(balance_num).toFixed(8);
    return balance_num;
}

//注册商户
export async function registerMerchant() {
    let account = await ethAccounts();
    let gas = await getGasPrice();
    gas = Number(gas) + Number(CONFIG.GasExtra);
    return new Promise(function(resolve, reject) {
        Contract_c2c.methods.registerMerchant().send({ from: account, gasPrice: gas, gas: CONFIG.GasExtra2 }).on('confirmation', function(error, transactionHash) {
            if (error) {
                return reject(error);
            }
            return resolve(transactionHash);
        })
    })
}

export async function merchantOrders(gateWay, id) {
    let res = await Contract_c2c.methods.merchantOrders(gateWay, id).call();
    return res;
}

//查找达到条件的商户
export async function rsaKeys(address) {
    let rsaKeys = await Contract_c2c.methods.rsaKeys(address).call();
    return rsaKeys;
}

//网关信息
export async function gatewayInfoBase(gateWay) {
    let info = await Contract_c2c.methods.gatewayInfoBase(gateWay).call();
    return info;
}

//申诉
export async function appealOrder_NoReceive(id) {
    let account = await ethAccounts();
    let gas = await getGasPrice();
    gas = Number(gas) + Number(CONFIG.GasExtra2);
    return new Promise(function(resolve, reject) {
        Contract_c2c.methods.appealOrder_NoReceive(id).send({ from: account, gasPrice: gas, gas: CONFIG.GasExtra2 }).on('confirmation', function(error, transactionHash) {
            if (error) {
                return reject(error);
            }
            return resolve(transactionHash);
        })
    })
}

//申诉2
export async function appealOrder_Wrong(id) {
    let account = await ethAccounts();
    let gas = await getGasPrice();
    gas = Number(gas) + Number(CONFIG.GasExtra2);
    return new Promise(function(resolve, reject) {
        Contract_c2c.methods.appealOrder_Wrong(id).send({ from: account, gasPrice: gas, gas: CONFIG.GasExtra2 }).on('confirmation', function(error, transactionHash) {
            if (error) {
                return reject(error);
            }
            return resolve(transactionHash);
        })
    })
}

//确认订单
export async function payOrder(orderID) {
    let account = await ethAccounts();
    let gas = await getGasPrice();
    gas = Number(gas) + Number(CONFIG.GasExtra2);
    return new Promise(function(resolve, reject) {
        Contract_c2c.methods.payOrderByCustomer(orderID).send({ from: account, gasPrice: gas, gas: CONFIG.GasExtra2 }).on('confirmation', function(error, transactionHash) {
            if (error) {
                return reject(error);
            }
            return resolve(transactionHash);
        })
    })
}


export async function id_address(id) {
    let address = await Contract_c2c.methods.id_address(id).call();
    return address;
}

//查找达到条件的商户
export async function queryAllMerchantOrders(gateWay) {
    var status = true;
    var start = 0;
    var online = true;
    var level = 1;
    var price = 0;
    var goods = 0;
    var returnNum = 999999;
    let MerchantOrders = await Contract_c2c.methods.queryAllMerchantOrders(status, start, gateWay, online, level, price, goods, returnNum).call();
    return MerchantOrders;
}

//授权
export async function authorize_coin(Addr, num) {
    let gas = await getGasPrice();
    let UserAddr = await ethAccounts();
    num = Number(num);
    num = num * Math.pow(10, 18);
    if (String(num).indexOf('e+') != -1) {
        let num_str = String(num).split('e+');
        let new_str = num_str[0] + '0'.repeat(num_str[1]);
        num = new_str;
    }
    num = web3.utils.toBN(num);
    num = num.toString();
    gas = Number(gas) + Number(CONFIG.GasExtra);
    return new Promise(function(resolve, reject) {
        Contract_undt.methods.approve(Addr, num).send({ from: UserAddr, gasPrice: gas, gas: CONFIG.GasExtra2 }).on('confirmation', function(error, transactionHash) {
            if (error) {
                return reject(error);
            }
            return resolve(transactionHash);
        })
    });
}


//获取订单数和申诉数
export async function Statisticss(address) {
    let res = await Contract_c2c.methods.Statisticss(address).call();
    return res;
}

//获取授权数量
export async function authorize_coin_num(Addr) {
    let UserAddr = await ethAccounts();
    return new Promise(function(resolve, reject) {
        Contract_undt.methods.allowance(UserAddr, Addr).call()
            .then(
                function(data) {
                    if (data > 0) {

                        var num = Number(data) / Math.pow(10, 18);
                    } else {
                        var num = 0;
                    }
                    resolve(num);
                },
                function(e) {
                    console.log(e);
                }
            );
    });
}

//获取商户信息
export async function merchants(address) {
    let merchants_info = await Contract_c2c.methods.merchants(address).call();
    return merchants_info;
}

//增加保证金
export async function addBond(num) {
    let gas = await getGasPrice();
    let UserAddr = await ethAccounts();
    num = Number(num);
    num = num * Math.pow(10, 18);
    if (String(num).indexOf('e+') != -1) {
        let num_str = String(num).split('e+');
        let new_str = num_str[0] + '0'.repeat(num_str[1]);
        num = new_str;
    }

    num = web3.utils.toBN(num);
    num = num.toString();

    gas = Number(gas) + Number(CONFIG.GasExtra);
    return new Promise(function(resolve, reject) {
        Contract_c2c.methods.addBond(num).send({ from: UserAddr, gasPrice: gas, gas: CONFIG.GasExtra2 }).on('confirmation', function(error, transactionHash) {
            if (error) {
                return reject(error);
            }
            return resolve(transactionHash);
        })
    });
}

//减少保证金
export async function subBond(num) {
    let gas = await getGasPrice();
    let UserAddr = await ethAccounts();
    num = Number(num);
    num = num * Math.pow(10, 18);
    if (String(num).indexOf('e+') != -1) {
        let num_str = String(num).split('e+');
        let new_str = num_str[0] + '0'.repeat(num_str[1]);
        num = new_str;
    }

    num = web3.utils.toBN(num);
    num = num.toString();

    gas = Number(gas) + Number(CONFIG.GasExtra);
    return new Promise(function(resolve, reject) {
        Contract_c2c.methods.subBond(num).send({ from: UserAddr, gasPrice: gas, gas: CONFIG.GasExtra2 }).on('confirmation', function(error, transactionHash) {
            if (error) {
                return reject(error);
            }
            return resolve(transactionHash);
        })
    });
}

export async function updateRsaKey(pubKey) {
    let gas = await getGasPrice();
    let UserAddr = await ethAccounts();
    gas = Number(gas) + Number(CONFIG.GasExtra);
    return new Promise(function(resolve, reject) {
        Contract_c2c.methods.updateRsaKey(pubKey).send({ from: UserAddr, gasPrice: gas, gas: 500000 }).on('confirmation', function(error, transactionHash) {
            if (error) {
                return reject(error);
            }
            return resolve(transactionHash);
        })
    });
}
export async function setMerchantOrder(gateWay, price, min, max, goods, fee) {
    let gas = await getGasPrice();
    let UserAddr = await ethAccounts();
    price = Number(price);
    price = price * Math.pow(10, 18);
    if (String(price).indexOf('e+') != -1) {
        let num_str = String(price).split('e+');
        let new_str = num_str[0] + '0'.repeat(num_str[1]);
        price = new_str;
    }
    price = web3.utils.toBN(price);
    price = price.toString();
    min = Number(min);
    min = min * Math.pow(10, 18);
    if (String(min).indexOf('e+') != -1) {
        let num_str = String(min).split('e+');
        let new_str = num_str[0] + '0'.repeat(num_str[1]);
        min = new_str;
    }
    min = web3.utils.toBN(min);
    min = min.toString();
    max = Number(max);
    max = max * Math.pow(10, 18);
    if (String(max).indexOf('e+') != -1) {
        let num_str = String(max).split('e+');
        let new_str = num_str[0] + '0'.repeat(num_str[1]);
        max = new_str;
    }
    max = web3.utils.toBN(max);
    max = max.toString();
    goods = Number(goods);
    fee = Number(fee);
    fee = fee * Math.pow(10, 18);
    if (String(fee).indexOf('e+') != -1) {
        let num_str = String(fee).split('e+');
        let new_str = num_str[0] + '0'.repeat(num_str[1]);
        fee = new_str;
    }
    fee = web3.utils.toBN(fee);
    fee = fee.toString();
    gas = Number(gas) + Number(CONFIG.GasExtra);
    return new Promise(function(resolve, reject) {
        Contract_c2c.methods.setMerchantOrder(gateWay, price, min, max, goods, fee).send({ from: UserAddr, gasPrice: gas, gas: CONFIG.GasExtra2 }).on('confirmation', function(error, transactionHash) {
            if (error) {
                return reject(error);
            }
            return resolve(transactionHash);
        })
    });
}

//商户修改在线状态
export async function setMerchantOnline(gateway, online) {
    let account = await ethAccounts();
    let gas = await getGasPrice();
    gas = Number(gas) + Number(CONFIG.GasExtra2);
    return new Promise(function(resolve, reject) {
        Contract_c2c.methods.setMerchantOnline(gateway, online).send({ from: account, gasPrice: gas, gas: CONFIG.GasExtra2 }).on('confirmation', function(error, transactionHash) {
            if (error) {
                return reject(error);
            }
            return resolve(transactionHash);
        })
    })
}

//商户确认订单
export async function completeOrder(orderID, msg) {
    let account = await ethAccounts();
    let gas = await getGasPrice();
    gas = Number(gas) + Number(CONFIG.GasExtra2);
    return new Promise(function(resolve, reject) {
        Contract_c2c.methods.completeOrder(orderID, msg).send({ from: account, gasPrice: gas, gas: CONFIG.GasExtra2 }).on('confirmation', function(error, transactionHash) {
            if (error) {
                return reject(error);
            }
            return resolve(transactionHash);
        })
    })
}

//锁定订单
export async function lockOrder(orderID, status) {
    let account = await ethAccounts();
    let gas = await getGasPrice();
    gas = Number(gas) + Number(CONFIG.GasExtra2);
    return new Promise(function(resolve, reject) {
        Contract_c2c.methods.lockOrder(orderID, status).send({ from: account, gasPrice: gas, gas: CONFIG.GasExtra2 }).on('confirmation', function(error, transactionHash) {
            if (error) {
                return reject(error);
            }
            return resolve(transactionHash);
        })
    })
}


//取消订单
export async function cancelOrderByMerchant(orderID) {
    let account = await ethAccounts();
    let gas = await getGasPrice();
    gas = Number(gas) + Number(CONFIG.GasExtra2);
    return new Promise(function(resolve, reject) {
        Contract_c2c.methods.cancelOrderByMerchant(orderID).send({ from: account, gasPrice: gas, gas: CONFIG.GasExtra2 }).on('confirmation', function(error, transactionHash) {
            if (error) {
                return reject(error);
            }
            return resolve(transactionHash);
        })
    })
}

//商户退款
export async function refundOrder(orderID) {
    let account = await ethAccounts();
    let gas = await getGasPrice();
    gas = Number(gas) + Number(CONFIG.GasExtra2);
    return new Promise(function(resolve, reject) {
        Contract_c2c.methods.refundOrder(orderID).send({ from: account, gasPrice: gas, gas: CONFIG.GasExtra2 }).on('confirmation', function(error, transactionHash) {
            if (error) {
                return reject(error);
            }
            return resolve(transactionHash);
        })
    })
}

//上传swarm
export async function upload(str) {
    const client = new Erebos.swarm.SwarmClient({
        http: 'https://swarm-gateways.net',
    })
    info = client.bzz.upload(str, { contentType: 'text/plain' }).then();
    return info;
}

//下载swarm
export async function download(str) {
    const client = new Erebos.swarm.SwarmClient({
        http: 'https://swarm-gateways.net',
    })
    info = client.bzz.download(str).then(res => res.text());
    return info;
}

//申诉交流
export async function appealOrderAnswer(orderID, msg) {
    let account = await ethAccounts();
    let gas = await getGasPrice();
    gas = Number(gas) + Number(CONFIG.GasExtra2);
    return new Promise(function(resolve, reject) {
        Contract_c2c.methods.appealOrderAnswer(orderID, msg).send({ from: account, gasPrice: gas, gas: CONFIG.GasExtra2 }).on('confirmation', function(error, transactionHash) {
            if (error) {
                return reject(error);
            }
            return resolve(transactionHash);
        })
    })
}

//申诉交流
export async function updateMerchants(agent, cashier, refundClerk, receive) {
    let account = await ethAccounts();
    let gas = await getGasPrice();
    gas = Number(gas) + Number(CONFIG.GasExtra2);
    return new Promise(function(resolve, reject) {
        Contract_c2c.methods.updateMerchant(agent, cashier, refundClerk, receive).send({ from: account, gasPrice: gas, gas: CONFIG.GasExtra2 }).on('confirmation', function(error, transactionHash) {
            if (error) {
                return reject(error);
            }
            return resolve(transactionHash);
        })
    })
}