import { SelectedStore } from "./selectedStore";

export interface appData {
    view: string,
    currentUser: any,
    userToEdit: any,
    users: any,
    stores: {
        selectedStore: SelectedStore,
        allStores: any
    },
    companies: any,
    products: any,
    avatars: Array<string>,
    modal: {
        currentModal: string,
        modals: any
    }
}