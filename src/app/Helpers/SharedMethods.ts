import appData from "../Services/Data/AppData";

export default class SharedMethods {

    public static concatName(name, surname) {
        return `${name} ${surname}`;
    }

    public static convertStringToArray(str,symb) {
        let arr = str.split(symb);
        for (let i = 0; i < arr.length; i++) {
            arr[i] = Number.parseInt(arr[i]);
        }
        return arr;
    }

    public static returnUserInfoForSections(users, avatars, idList) {
        const usersArr = [];
        users.forEach( user => {
            if (idList.includes(user.id)) {
                usersArr.push({
                    name: this.concatName(user.name, user.surname),
                    img: avatars[user.avatarID],
                    id: user.id
                });
            }
        });
        return usersArr;
    }

    public static getPositions(service: any) {        
        service.getPositions(this.getToken(appData)).subscribe((data:any) => {
            data.forEach( position => {
                position.status = position.isActive ? 'აქტიური' : 'პასიური';
            });
            appData.data.users.positions = data;
        });
    }

    public static addDaysToDate(date, days) {
        let newDT = new Date(date);
        newDT.setDate(newDT.getDate() + days);
        const day = newDT.getDate();
        const month = newDT.getMonth() + 1;
        const year = newDT.getFullYear();
        return `${day.toString().length < 2 ? 0+day.toString() : day}.${month.toString().length < 2 ? 0+month.toString() : month}.${year}`;
    }

    public static getActivityName(url) {
        switch(url) {
            case 'Products/Create'    : {
                return {
                    type: 'create',
                    text: 'პროდუქციის შექმნა'
                };
            }
            case 'Products/Delete'     : {
                return {
                    type: 'delete',
                    text: 'პროდუქტის წაშლა'
                };
            }
            case 'Companies/Create'     : {
                return {
                    type: 'create',
                    text: 'კომპანიის რეგისტრაცია'
                };
            }
            case 'Companies/Delete'     : {
                return {
                    type: 'delete',
                    text: 'კომპანიის წაშლა'
                };
            }
            case 'Companies/Update'     : {
                return {
                    type: 'update',
                    text: 'კომპანიის რედაქტირება'
                };
            }
            case 'ProductToBranches/Create' : {
                return {
                    type: 'delete',
                    text: 'პროდუქტის შეტანა ფილიალში'
                };
            }
            case 'ProductToBranches/Delete'     : {
                return {
                    type: 'delete',
                    text: 'პროდუქტის გატანა ფილიალიდან'
                };
            }
            case 'Products/Delete'     : {
                return {
                    type: 'delete',
                    text: 'პროდუქტის წაშლა'
                };
            }
            case 'Products/Delete'     : {
                return {
                    type: 'delete',
                    text: 'პროდუქტის წაშლა'
                };
            }
            case 'Products/Delete'     : {
                return {
                    type: 'delete',
                    text: 'პროდუქტის წაშლა'
                };
            }
            case 'Products/Delete'     : {
                return {
                    type: 'delete',
                    text: 'პროდუქტის წაშლა'
                };
            }
            default: {
                return {
                    type: 'add',
                    text: '------------'
                };
            }
        }
    }

    public static isStoreView() {
        return appData.data.view === 'storeView';
    }

    public static loader(value: boolean) {
        appData.data.loading = value;
    }


    public static getAction(actionID) {
        switch( actionID ) {
            case 11: {
                return 'პროდუქციის დამატება';
            }
            case 12: {
                return 'პროდუქციის განახლება';
            }
            case 13: {
                return 'პროდუქციის წაშლა';
            }
            
            case 21: {
                return 'მომხმარებლის დამატება';
            }
            case 22: {
                return 'მომხმარებლის განახლება';
            }
            case 23: {
                return 'მომხმარებლის წაშლა';
            }
            
            case 31: {
                return 'ფილიალის დამატება';
            }
            case 32: {
                return 'ფილიალის განახლება';
            }
            case 33: {
                return 'ფილიალის წაშლა';
            }
            
            case 41: {
                return 'კომპანიის დამატება';
            }
            case 42: {
                return 'კომპანიის განახლება';
            }
            case 43: {
                return 'კომპანიის წაშლა';
            }
        }
    }
    
    public static sortByDate(arr) {
        arr.sort(function(a, b) {
            a = new Date(a.date);
            b = new Date(b.date);
            return a>b ? -1 : a<b ? 1 : 0;
        });
        return arr;
    }

    public static getProducts(data: any, service: any, callback: any) {
        service.getAll(this.getToken(data)).subscribe( (data: any) => {
            callback(data.data);
        });
    }

    public static getProductsByStore(data: any, service: any, storeID: number, callback: any) {
        service.getByStore(storeID, this.getToken(data)).subscribe( (data: any) => {
            callback(data);
          });
        
    }

    public static getUsedRoles(service: any,id: number,callback: any) {
        service.getUsersWithRoles(id,this.getToken(appData)).subscribe((data:any) => {
            callback(data);
        });
    }

    public static getCompanies(data: any, service: any, callback: any) {
        service.getAll(this.getToken(data)).subscribe( (dt: any) => {
          callback(dt);
        });
    }

    public static getStores() {
        
    }

    public static getSectionsWithData(data: any, service: any) {
        service.getAllWithData(this.getToken(data)).subscribe((dt: any) => {
            data.data.sections = dt;
        });
    }

    public static getReasonns(data: any, service: any) {
        service.getReasons(this.getToken(data)).subscribe((dt: any) => {
            data.PRReasons = dt;
        });
    }

    public static getSections(data: any, service: any, callback: any) {
        service.getAll(this.getToken(data)).subscribe((dt: any) => {
            callback(dt);
        });
    }

    public static getUsers(data: any, service: any, callback: any) {
        service.allUsers(this.getToken(data)).subscribe( (dt: any) => {
          callback(dt);
        });
    }

    public static getUsersByStore(data: any, storeID: number, service: any, callback: any) {
        service.getByStore(storeID, this.getToken(data)).subscribe( (dt: any) => {
          callback(dt);
        });
    }

    public static setInfoBoxes(dt: any, infoBoxes: any, type: string, fun: any) {
        if (appData.data.loading == false ) {
            this.loader(true);
        }
        fun.subscribe((data: any) => {
            console.warn(data, type);
            switch(type){
                case 'stores': {
                    dt.data[type].allStores = data.data;
                    this.loader(false);
                    break;
                }
                case 'users': {
                    dt.data.users.data = data.data;
                    this.loader(false);
                    break;
                }
                case 'companies': {
                    dt.data.companies.data = data.data;
                    this.loader(false);
                    break;
                }
                default: {
                    dt.data[type] = data.data;
                    this.loader(false);
                    break;
                }
            }
            this.assignInfoboxes((type === 'users' ? data.totalRecords : data.data.length), type, infoBoxes);
        });
    }

    public static assignInfoboxes(data, boxID, infoBoxes){
        const infoBOX: any = infoBoxes.filter( box => box.id == boxID)[0];
        infoBOX.content = data;
    }

    public static getToken(data) {
        let token = '';
        if ( data.data.currentUser.token) {
          token = data.data.currentUser.token;
        } else {
          const authorizedUser = JSON.parse(window.localStorage.getItem('authorizedUser'));
          token = authorizedUser.token;
        }
        return token;
    }

    public static getModifiedDate(date) {
        const dt = new Date(date);
        const day = dt.getDate();
        const year = dt.getFullYear();
        const monthInd = dt.getMonth();
        const months = ['იან.', 'თებ.','მარ.', 'აპრ.','მაი.','ივნ.','ივლ.','აგვ.','სექ.','ოქტ.','ნოე.','დეკ.'];
        return `${day} ${months[monthInd]} ${year}`;
    }

    public static getHoursFromDate(date) {
        const dt = new Date(date);
        const hours = dt.getHours();
        const minutes = dt.getMinutes() >= 10 ? dt.getMinutes() : '0' + dt.getMinutes();
        return `${hours}:${minutes}`;
    }

    public static calculateDays(date1, date2=null, getWorkingDays=false) {
        const dt1: any = new Date(date1);
        const dt2: any = date2 !== null ? new Date(date2) : new Date();
        
        // Validate input
        if (dt2 < dt1)
        return 0;

        // Calculate days between dates
        var millisecondsPerDay = 86400 * 1000; // Day in milliseconds
        dt1.setHours(0,0,0,1);  // Start just after midnight
        dt2.setHours(23,59,59,999);  // End just before midnight
        var diff = dt2 - dt1;  // Milliseconds between datetime objects
        var days = Math.ceil(diff / millisecondsPerDay);

        if(getWorkingDays){
            // Subtract two weekend days for every week in between
            var weeks = Math.floor(days / 7);
            days = days - (weeks * 2);

            // Handle special cases
            var startDay = dt1.getDay();
            var endDay = dt2.getDay();

            // Remove weekend not previously removed.
            if (startDay - endDay > 1)
                days = days - 2;

            // Remove start day if span starts on Sunday but ends before Saturday
            if (startDay == 0 && endDay != 6)
                days = days - 1;

            // Remove end day if span ends on Saturday but starts after Sunday
            if (endDay == 6 && startDay != 0)
                days = days - 1;
        }
        return days; 
    }

    public static isSuccess(data: any) {
        return data.status === 'SUCCESS';
    }


    public static alertNotification(toastr,type,data) {

          switch ( type ) {
            case 'info': {
                toastr.info(data.text);
              break;
            }
            case 'success': {
                toastr.success(data.text);
              break;
            }
            case 'warning': {
                toastr.warning(data.text);
              break;
            }
            case 'danger': {
                toastr.error(data.text);
              break;
            }
        }
    }
    
}
