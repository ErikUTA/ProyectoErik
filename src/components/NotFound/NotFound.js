import { Button } from "@mui/material";
import React, { Suspense } from "react"
import { useTranslation } from 'react-i18next';

function NotFound(){
    const { t, i18n } = useTranslation(['translate']);
    return(
        <Suspense fallback="Cargando traducciones...">            
            <div className="center-a">
                <div className="perfil">
                    <img className="foto-perfil" src="https://www.cinco8.com/wp-content/uploads/2020/08/404.png" width={180} height={150} /><br />
                    <p dangerouslySetInnerHTML={{
                        __html: t("titleNotFound"),
                    }} />
                </div>
            </div>
        </Suspense>
    )
}

export default NotFound;