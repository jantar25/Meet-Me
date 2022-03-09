export default interface Iroute {
    path:string;
    name:string;
    exact:boolean;
    component:any;
    props?:any;
}