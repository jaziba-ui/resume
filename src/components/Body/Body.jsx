import React, {useState,useRef} from 'react'
import styles from './Body.module.css'
import Editor from '../Editor/Editor';
import {ArrowDown} from 'react-feather'
import Resume from '../Resume/Resume';
import ReactToPrint from 'react-to-print'

function Body(){
    const colors = ['#239ce2','#48bb78','#0bc5c8ea','#a0aec0','#ed8936'];
    const sections = {
        basicInfo : "Basic Info",
        workExp : "Work Experience",
        project : "Projects",
        education : "Education",
        achievement : "Achievements",
        summary : "Summary",
        other : "Other",
    };
    const resumeRef = useRef()
    const [activeColor,setActiveColor] = useState(colors[0])
    const [resumeInformation,setresumeInformation] = useState({
        [sections.basicInfo]:{
            id: sections.basicInfo,
            sectionTitle: sections.basicInfo,
            detail :{},
        },
        [sections.workExp]:{
            id: sections.workExp,
            sectionTitle: sections.workExp,
            details:[],
        },
        [sections.project]:{
            id: sections.project,
            sectionTitle: sections.project,
            details:[],
        },
        [sections.education]:{
            id: sections.education,
            sectionTitle: sections.education,
            details:[],
        },
        [sections.achievement]:{
            id: sections.achievement,
            sectionTitle: sections.achievement,
            points:[],
        },
        [sections.summary]:{
            id: sections.summary,
            sectionTitle: sections.summary,
            details:"",
        },
        [sections.other]:{
            id: sections.other,
            sectionTitle: sections.other,
            details:"",
        },
    });

    return(
        <div className={styles.container}>
            <p className={styles.heading}>Resume Builder</p>
            <div className={styles.toolbar}>
                <div className={styles.colors}>
                {
                    colors.map((item) => (
                        <span 
                        key = {item}
                        style = {{backgroundColor : item}}
                        className={`${styles.color} 
                        ${activeColor===item? styles.active : ""}`} 
                        onClick = {() => setActiveColor(item)}
                        />
                    ))
                } 
                </div>
                <ReactToPrint
          trigger={() => {
            return <button>Download <ArrowDown/></button>
          }}
          content={() => resumeRef.current}
        />
                
            </div>
            <div className={styles.main}>
            <Editor sections={sections} 
            information = {resumeInformation}
            setInformation = {setresumeInformation}
            />
            <Resume 
            ref={resumeRef}
            sections={sections} 
            information = {resumeInformation}
            activeColor = {activeColor}/>
            </div>
        </div>
    )
}
export default Body;