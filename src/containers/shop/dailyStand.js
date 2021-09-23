import React, {useState, useEffect} from 'react';

import {config} from "../../config/config"
import {convertDate} from "../../utils/utils"

import {getDailyStand, getDailyStandDetails} from "../../api/dailyStand"

import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel"

//Imports des composants de l'UI externes
import Header from "../headers/header"
import HeaderPages from "../headers/headerPages"
import Footer from "../footer"

const DailyStand = (props) => {

    const headerTitle = "Etal du jour"
    const headerBreadcrumbs = [{value: "Accueil", link:"/"},
                               {value: "Etail du jour", link:null}]
    const [dailyStand, setDailyStand] = useState({})
    const [dailyStandDetails, setDailyStandDetails] = useState([])

    //Au chargement de la page
    useEffect(() => {
        getDailyStand()
        .then(dailyStandDB => {
            setDailyStand(dailyStandDB)
            getDailyStandDetails()
            .then(dailyStandDetailsDB => {
                setDailyStandDetails(dailyStandDetailsDB)
            })
        })
    }, [])

    //Configuration du slider des avis
    const sliderSettings = {
        showStatus: false,
        showArrows: true,
        showThumbs:false,
        showIndicators: true,
        autoPlay:true,
        interval:5000,
        stopOnHover:true,
        infiniteLoop:true,
        swipeable:false,
    }

    return(
        <section className="root">
            <Header />
            <HeaderPages headerTitle={headerTitle} headerBreadcrumbs={headerBreadcrumbs}/>

            <section className="dailystand-container">
                <section className="dailystand-header">
                    {dailyStand ? <p>Aujourd'hui, le {convertDate(dailyStand.creation_timestamp)}, nous vous proposons : </p> : <p>Pas d'étal du jour pour le moment. Veuillez revenir plus tard</p>}
                    {dailyStand && <p>{dailyStand.description}</p>}
                </section>
                {dailyStandDetails.length > 0 &&<section className="dailystand-content">
                <Carousel {...sliderSettings}>
                    {dailyStandDetails.map((dailyStandItem) => {
                        return (
                            <article key={dailyStandItem.id}>
                                <section>
                                    <img src={config.dailystand_detail_pict_url + dailyStandItem.pict_url} alt="" />
                                </section>
                                {dailyStandItem.description && <p className="legend">{dailyStandItem.description}</p>}
                            </article>)
                    })}
                </Carousel>
                </section>}
            </section>
            <Footer />
        </section>
    )
}

export default DailyStand

