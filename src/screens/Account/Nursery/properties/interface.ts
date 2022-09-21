import { ImageSourcePropType } from "react-native";

export interface IAvrageGraph {
    option: string;
    labels:string[];
    temperatures:number[];
  }

interface ITemperature {
  temperature: number;
  timestamp: string;
}

export interface IBlog {
    title: string;
    rightEl: any;
    source: ImageSourcePropType;
    subTitle?: string;
    width?: number;
    height?: number;
    option:string
  }