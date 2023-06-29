import FC, { useState } from 'react'


const useDancerModelPath = (name: string) => {

    const model_path = `../assets/models/${name}.fbx`

    return model_path

}

export default useDancerModelPath