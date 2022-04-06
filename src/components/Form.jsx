import { useState, useEffect } from 'react'
import styled from '@emotion/styled'
import Error from './Error'
import useSelectCoins from '../hooks/useSelectCoins'
import { coins } from '../data/coins'

const InputSubmit = styled.input`
	background-color: #9497FF;
	border: none;
	width: 100%;
	padding: 10px;
	color: #FFF;
	font-weight: 700;
	text-transform: uppercase;
	font-size: 20px;
	border-radius: 5px;
	transition: background-color .3s ease;
	margin-top: 30px;

	&:hover {
		background-color: #7A7DFE;
		cursor: pointer;
	}
`


const Form = ({setCoins}) => {
	const [ cryptos, setCryptos ] = useState([]);
	const [ isError, setIsError ] = useState(false);
	const [ coin, SelectCoins ] = useSelectCoins('Choose your Coin', coins)
	const [ cryptocurrency, SelectCryptocurrency ] = useSelectCoins('Choose your Cryptocurrency', cryptos)

	useEffect(() => {
		const consultAPI = async () => {
			const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=20&tsym=USD'
			const response = await fetch(url)
			const result = await response.json()

			const cryptosArray = result.Data.map( crypto => {

				const object = {
					id: crypto.CoinInfo.Name,
					name: crypto.CoinInfo.FullName,
				}	
				return object
			})
			setCryptos(cryptosArray)
		}
		consultAPI();
	}, []);

	const handleSubmit = e => {
		e.preventDefault()
		if ([coin, cryptocurrency].includes('')) {
			setIsError(true)
			return
		}
		setIsError(false)
		setCoins({
			coin,
			cryptocurrency
		})
	}
  return (
	  <>
			{isError && <Error>All fields are required</Error> }
			<form onSubmit= {handleSubmit} >
				<SelectCoins/>
				<SelectCryptocurrency/>
				<InputSubmit 
					type="submit" 
					value="Cotizar"
				/>
			</form>
	 </>
  )
}

export default Form
