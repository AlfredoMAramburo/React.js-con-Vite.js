import { useContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Layout from '../../Components/Layout';
import Card from '../../Components/Card';
import { ShoppingCartContext } from '../../Context';
import ProductDetail from '../../Components/ProductDetail';

function Home() {
  const context = useContext(ShoppingCartContext);
  const location = useLocation();
  const category = location.pathname.split('/')[1];

  useEffect(() => {
    context.setSearchByCategory(category);
  }, [category, context]);

  const renderView = () => {
    if (context.filterItems.length > 0) {
      return context.filterItems.map(item => (
        <Card key={item.id} data={item} />
      ));
    } else {
      return <div>No hay coincidencias</div>;
    }
  };

  return (
    <Layout>
      <div className='flex items-center justify-center relative w-80'>
        <h1>Productos Exclusivos</h1>
      </div>
      <input 
        type='text' 
        placeholder='Busca tu producto' 
        className='w-full max-w-md p-2 border border-black rounded-lg shadow-sm focus:outline-none mt-4 mb-4'
        value={context.searchByTitle} 
        onChange={(event) => context.setSearchByTitle(event.target.value)} 
      />
      <div className='grid gap-4 grid-cols-4 w-full max-w-screen-lg'>
        {renderView()}
      </div>
      <ProductDetail />
    </Layout>
  );
}

export default Home;
