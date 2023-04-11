//import hook useState
import { useState } from 'react';

//import router
import Router from 'next/router';


//import axios
import axios from "axios";
import { Button, FormControl, FormLabel, Input, Text, Textarea } from '@chakra-ui/react';

function PostCreate() {

    //state
    const [image, setImage] = useState('');
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    //state validation
    const [validation, setValidation] = useState({});

    //function "handleFileChange"
    const handleFileChange = (e) => {

        //define variable for get value image data
        const imageData = e.target.files[0]

        //check validation file
        if (!imageData.type.match('image.*')) {

            //set state "image" to null
            setImage('');

            return
        }

        //assign file to state "image"
        setImage(imageData);
    }

    //method "storePost"
    const storePost = async (e) => {
        e.preventDefault();

        //define formData
        const formData = new FormData();

        //append data to "formData"
        formData.append('thumbnail', image);
        formData.append('title', title);
        formData.append('content', content);

        //send data to server
        await axios.post(`${process.env.NEXT_PUBLIC_API_BACKEND}/api/posts`, formData)
        .then(() => {

            //redirect
            Router.push('/posts')

        })
        .catch((error) => {

            //assign validation on state
            setValidation(error.response.data);
        })

    };

    return (
        <form onSubmit={ storePost }>
            <FormControl marginBottom='3'>
                <FormLabel>Title</FormLabel>
                <Input type='text' value={title} onChange={(e) => setTitle(e.target.value)}/>
                {validation.errors &&
                <Text color='red'>
                    {validation.errors.title}
                </Text>
                }
            </FormControl>

            <FormControl marginBottom='3'>
                <FormLabel>Thumbnail</FormLabel>
                <Input type='file' onChange={handleFileChange}/>
                {validation.errors &&
                <Text color='red'>
                    {validation.errors.thumbnail}
                </Text>
                }
            </FormControl>

            <FormControl marginBottom='3'>
                <FormLabel>Content</FormLabel>
                <Textarea value={content} onChange={(e) => setContent(e.target.value)}/>
                {validation.errors &&
                <Text color='red'>
                    {validation.errors.content}
                </Text>
                }
            </FormControl>

            <Button colorScheme='blue' type="submit">
                SIMPAN
            </Button>
        </form>
    );

}

export default PostCreate
