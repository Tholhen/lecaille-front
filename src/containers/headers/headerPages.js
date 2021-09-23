import React from "react";
import {Link} from "react-router-dom"

//Import des images
import wave1 from "../../assets/images/wave1.svg"
import wave2 from "../../assets/images/wave2.svg"

//Import des composants de la librairie MaterialUI
import Typography from '@material-ui/core/Typography';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import { withStyles} from "@material-ui/styles";

const HeaderPages = (props) => {

    const WhiteBreadcrumbs = withStyles({
        root: {
          color:"white"
        },
      })(Breadcrumbs);

    return(
        <section className="header-pages">
            
            <section className="header-pages-content">
                <h2>{props.headerTitle}</h2>
                <WhiteBreadcrumbs className="breadcrumbs">
                    {props.headerBreadcrumbs.map((element, key) => {
                            return(element.link !== null ? <Link to={element.link} key={key} className="link">{element.value}</Link> : <Typography color="secondary" key={key}>{element.value}</Typography>)
                    })}
                </WhiteBreadcrumbs>
            </section>    
            <section className="waves-header-pages">
                <img src={wave1} alt="Vague 1" />
                <img src={wave2} alt="Vague 2" />
            </section>
        </section>
    )
}

export default HeaderPages