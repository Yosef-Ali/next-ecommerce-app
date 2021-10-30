import axios from 'axios';
import { useState, useEffect } from 'react';

const StaticSide = ({ pokemon }) => {
	return pokemon.map((poke) => {
		return (
			<div key={poke.name}>
				<img src={poke.image} />
				<p>{poke.name}</p>
				<hr />
			</div>
		);
	});
};

export const getStaticProps = async () => {
	// const response = await axios.get(url, { headers });

	// const promises = response.data.results.map((result) => {
	// 	return axios.get(result.url, { headers });
	// });

	// const responses = await Promise.all(promises);

	// const pokeData = responses.map((r) => {
	// 	return {
	// 		name: r.data.name,
	// 		imgUrl: r.data.sprites.front_default,
	// 	};
	// });
	// return {
	// 	props: {
	// 		pokemon: pokeData,
	// 	},
	// };
	try {
		const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=150');
		const { results } = await res.json();
		const pokemon = results.map((pokemon, index) => {
			const paddedId = ('00' + (index + 1)).slice(-3);

			const image = `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${paddedId}.png`;
			return { ...pokemon, image };
		});
		return {
			props: { pokemon },
		};
	} catch (err) {
		console.error(err);
	}
};

export default StaticSide;
