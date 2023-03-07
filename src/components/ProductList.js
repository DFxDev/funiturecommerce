import React from 'react'
import { useFilterContext } from '../context/filter_context'
import GridView from './GridView'
import ListView from './ListView'
// import Product from './Product'
// import styled from 'styled-components'

const ProductList = () => {
  const { filtered_products: product, grid_view } = useFilterContext()
  console.log(product)
  if (product.lenght < 1) {
    return (
      <h5 style={{ textTransform: 'none' }}>
        sorry, no products matched your search...
      </h5>
    )
  }
  if(grid_view === false) {
    return <ListView products={product} />
  }
  return (
    <GridView  products={product}>
      show something
     
    </GridView>
  )
  
}
// const Wrapper = styled.section`
//   img {
//     height: 175px;
//   }

//   .products-container {
//     display: grid;
//     gap: 2rem 1.5rem;
//   }

//   @media (min-width: 992px) {
//     .products-container {
//       grid-template-columns: repeat(2, 1fr);
//     }
//   }
//   @media (min-width: 1170px) {
//     .products-container {
//       grid-template-columns: repeat(3, 1fr);
//     }
//   }
// `

export default ProductList
