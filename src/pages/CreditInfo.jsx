import React from 'react'
import wapp from '@icons/wapp.png';

const CreditInfo = () => {
    return (
        <>
        <a href='https://wa.me/+50670078323?text=¡Buenas,+me+regalas+detalles+sobre+desatados!' className="col-10 center items-center" 
        style={{
            position: 'fixed', 
            top: '0',
            background: '#02A820',
            color: 'white',
            height: '40px',
            fontSize: '15px'
            }}>
                
            Hablar con un agente
            <img className='mx-1' src={wapp} height={20} />
        </a>
            <div className='col-md-5 center' style={{padding: '40px 1rem'}}>
                <h3>Crédito a 4 meses!!!</h3>
                <br />
                <p className='col-10 '>
                    En <strong>Desatados</strong> queremos brindar a nuestros clientes una forma
                    facil y accesible de adquirir calzado.
                    <br />
                    <br />
                    Para esto ofrecemos un sistema de credito con plazo de 4 meses y mantenemos el mismo
                    precio de contado.
                    Ademas para nuestros clientes frecuentes tenemos beneficios con cada compra.
                </p>
                <br />
                <strong className='col-10 text-center p-2' style={{ background: 'rgb(202, 34, 24)', color: 'white' }}>
                    Lo unico que necesitas para adquirir tu primer credito es la PRIMA
                    sin papeles ni fiadores.
                </strong>

                <div className="col-10 my-2 p-2 flex-wrap">

                    <strong className='col-10 text-center'>
                        1. Primer pedido
                    </strong>
                    <br />
                    <span className='col-10 text-center'>-20% de prima</span>
                    <span className='col-10 text-center'>-0% de descuento</span>

                    <strong className='col-10 text-center mt-2 pt-2' style={{ borderTop: '1px solid rgba(0,0,0,.1)' }}>
                        2. Segundo pedido
                    </strong>
                    <br />
                    <span className='col-10 text-center'>-15% de prima</span>
                    <span className='col-10 text-center'>-0% de descuento</span>

                    <strong className='col-10 text-center mt-2 pt-2' style={{ borderTop: '1px solid rgba(0,0,0,.1)' }}>
                        3. Tercer pedido
                    </strong>
                    <br />
                    <span className='col-10 text-center'>-10% de prima</span>
                    <span className='col-10 text-center'>-5% de descuento</span>

                    <strong className='col-10 text-center mt-2 pt-2' style={{ borderTop: '1px solid rgba(0,0,0,.1)' }}>
                        4. A partir del cuarto pedido
                    </strong>
                    <br />
                    <span className='col-10 text-center'>-0% de prima</span>
                    <span className='col-10 text-center'>-10% de descuento</span>
                </div>
            </div>
        </>
    );
}

export default CreditInfo;