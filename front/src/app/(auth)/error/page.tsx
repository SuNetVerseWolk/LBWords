import React from 'react'
import Popup from '@/components/Popup'

export default function page() {
	return (
		<Popup className={'rounded-none text-cats-lightBeige'} >
			<h1 className='text-center text-4xl text-cats-lightCoral'>
				Ошибка сервера
			</h1>
			<p>
				Ошибка конфигурации сервера.
			</p>
			<p>
				Проверьте журнал действий сервера для получения дополнительной информации
			</p>
		</Popup>
	)
}
