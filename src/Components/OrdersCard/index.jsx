import { ArrowRightCircleIcon } from '@heroicons/react/24/solid'

const OrdersCard = ({ totalPrice, totalProducts }) => {
  return (
    <div 
    className="flex justify-between items-center p-4 mb-3 border border-gray-300 rounded-lg shadow-md bg-white">
      <p className="text-sm text-gray-700">
        <span className="font-semibold">01.02.23</span>
        <span className="mx-2 text-gray-500">|</span>
        <span className="text-gray-900">{totalProducts} Productos </span>
        <span className="mx-2 text-gray-500">|</span>
        <span className="font-semibold text-gray-900">${totalPrice}</span>
      </p>
      <ArrowRightCircleIcon className="h-6 w-6 text-black cursor-pointer hover:text-gray-700" />
    </div>
  )
}

export default OrdersCard
