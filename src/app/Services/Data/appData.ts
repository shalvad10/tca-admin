import { appData } from "../Interfaces/appData";
class AppData {
    data = {
        loading: false,
        view: '',
        currentUser: {
            id                : 0,
            avatarID          : 0,
            email             : '',
            magazineBranchId  : 0,
            mobileNumber      : 0,
            positionId        : 0,
            firstName         : '',
            lastName          : '',
            username          : '',
            token             : '',
        },
        userToEdit: {
            id                : 0,
            avatarID          : 0,
            email             : '',
            magazineBranchId  : 0,
            mobileNumber      : 0,
            positionId        : 0,
            firstName         : '',
            lastName          : '',
            username          : '',
            token             : '',
        },
        users: {
            pages: [],
            active: 0,
            data: [],
            positions: [],
            usedRolesList: []
        },
        stores: {
            selectedStore: undefined,
            allStores: [],
            branches: {
                selectedBranch: undefined,
                allBranches: []
            }
        },
        notifications: [],    
        companies: {
            selectedCompany: undefined,
            data: []
        },
        sections: [],
        products: [], 
        productsLogs: [],
        PRReasons: [], // პროდუქციის ამოღების ვარიაციები...
        avatars: [
            './assets/avatars/avatar_0.svg',
            './assets/avatars/avatar_1.svg',
            './assets/avatars/avatar_2.svg',
            './assets/avatars/avatar_3.svg',
            './assets/avatars/avatar_4.svg',
            './assets/avatars/avatar_5.svg',
            './assets/avatars/avatar_6.svg',
            './assets/avatars/avatar_7.svg',
            './assets/avatars/avatar_8.svg',
            './assets/avatars/avatar_9.svg',
            './assets/avatars/avatar_10.svg',
            './assets/avatars/avatar_11.svg',
            './assets/avatars/avatar_12.svg',
            './assets/avatars/avatar_13.svg',
            './assets/avatars/avatar_14.svg',
            './assets/avatars/avatar_15.svg',
            './assets/avatars/avatar_16.svg',
            './assets/avatars/avatar_17.svg',
            './assets/avatars/avatar_18.svg',
            './assets/avatars/avatar_19.svg',
            './assets/avatars/avatar_20.svg',
            './assets/avatars/avatar_21.svg',
            './assets/avatars/avatar_22.svg',
            './assets/avatars/avatar_23.svg',
            './assets/avatars/avatar_24.svg',
            './assets/avatars/avatar_25.svg',
            './assets/avatars/avatar_26.svg',
            './assets/avatars/avatar_27.svg',
            './assets/avatars/avatar_28.svg',
            './assets/avatars/avatar_29.svg',
            './assets/avatars/avatar_30.svg',
            './assets/avatars/avatar_31.svg',
            './assets/avatars/avatar_32.svg',
            './assets/avatars/avatar_33.svg',
            './assets/avatars/avatar_34.svg',
            './assets/avatars/avatar_35.svg',
            './assets/avatars/avatar_36.svg',
            './assets/avatars/avatar_37.svg',
            './assets/avatars/avatar_38.svg',
            './assets/avatars/avatar_39.svg',
            './assets/avatars/avatar_40.svg',
            './assets/avatars/avatar_41.svg',
            './assets/avatars/avatar_42.svg',
            './assets/avatars/avatar_43.svg',
            './assets/avatars/avatar_44.svg',
            './assets/avatars/avatar_45.svg',
            './assets/avatars/avatar_46.svg',
            './assets/avatars/avatar_47.svg',
            './assets/avatars/avatar_48.svg',
            './assets/avatars/avatar_49.svg',
            './assets/avatars/avatar_50.svg',
            './assets/avatars/avatar_51.svg',
            './assets/avatars/avatar_52.svg',
            './assets/avatars/avatar_53.svg',
            './assets/avatars/avatar_54.svg',
            './assets/avatars/avatar_55.svg',
            './assets/avatars/avatar_56.svg',
            './assets/avatars/avatar_57.svg',
            './assets/avatars/avatar_58.svg',
            './assets/avatars/avatar_59.svg',
            './assets/avatars/avatar_60.svg',
            './assets/avatars/avatar_61.svg',
            './assets/avatars/avatar_62.svg',
            './assets/avatars/avatar_63.svg',
            './assets/avatars/avatar_64.svg',
            './assets/avatars/avatar_65.svg',
            './assets/avatars/avatar_66.svg',
            './assets/avatars/avatar_67.svg',
            './assets/avatars/avatar_68.svg',
            './assets/avatars/avatar_69.svg',
            './assets/avatars/avatar_70.svg',
            './assets/avatars/avatar_71.svg',
            './assets/avatars/avatar_72.svg',
            './assets/avatars/avatar_73.svg',
            './assets/avatars/avatar_74.svg',
            './assets/avatars/avatar_75.svg',
            './assets/avatars/avatar_76.svg',
            './assets/avatars/avatar_77.svg',
            './assets/avatars/avatar_78.svg',
            './assets/avatars/avatar_79.svg',
            './assets/avatars/avatar_80.svg',
            './assets/avatars/avatar_81.svg'
        ],
        modal: {
            currentModal: '',
            modals: {
                addUser: {
                    name: 'addUser',
                    storeID: 0,
                    sectionID: 0,
                    type: '' //section, store
                },
                konsultantebi: {
                    name: 'konsultantebi',
                    sectionID: 0,
                    users: [],
                },
                info: {
                    name: 'info',
                    actionID: 0,
                    text: null
                },
                removeProduct: {
                    name: 'removeProduct',
                    productToBranchID: 0,
                    productQuantity: 0
                },
                confirm: {
                    name: 'confirm',
                    typeID: 0,
                    targetID: 0,
                    activityID: 0,
                    targetName: '',
                    data: {}
                }
            }
        }
    };
}

const appData = new AppData();
export default appData;