import { useState } from "react";
import "./StatisticalInfo.css";
import { db } from "./firebase";

const data_surgery = [
  "Topic: Surgery",
  "<br/>Number of posts published: 10",
  "<br/>Number of posts you liked in topic: 5",
  "<br/>Number of posts with this topic you shared: 4",
  "<br/>Number of comments to posts of this topic: 5"
];

const data_research = [
  "Topic: Research",
  "<br/>Number of posts published: 2",
  "<br/>Number of posts you liked in topic: 1",
  "<br/>Number of posts with this topic you shared: 1",
  "<br/>Number of comments to posts of this topic: 0"
];

const data_experiment = [
  "Topic: Experiment",
  "<br/>Number of posts published: 9",
  "<br/>Number of posts you liked in topic: 2",
  "<br/>Number of posts with this topic you shared: 0",
  "<br/>Number of comments to posts of this topic: 5"
];

const data_events = [
  "Topic: Events",
  "<br/>Number of posts published: 1",
  "<br/>Number of posts you liked in topic: 1",
  "<br/>Number of posts with this topic you shared: 0",
  "<br/>Number of comments to posts of this topic: 4"
];

const data_diseases = [
  "Topic: Diseases",
  "<br/>Number of posts published: 4",
  "<br/>Number of posts you liked in topic: 10",
  "<br/>Number of posts with this topic you shared: 2",
  "<br/>Number of comments to posts of this topic: 10"
];

function StatisticalInfo() {
  return (
    <div className="Info">
      <div>
        <h1>Your usage of the website</h1>
        <h2 dangerouslySetInnerHTML={{ __html: data_surgery.join("") }}></h2>
        <h2 dangerouslySetInnerHTML={{ __html: data_research.join("") }}></h2>
        <h2 dangerouslySetInnerHTML={{ __html: data_experiment.join("") }}></h2>
        <h2 dangerouslySetInnerHTML={{ __html: data_events.join("") }}></h2>
        <h2 dangerouslySetInnerHTML={{ __html: data_diseases.join("") }}></h2>
      </div>
    </div>
  );
}

export default StatisticalInfo;
