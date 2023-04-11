//import hook useState
import { useState } from 'react';

//import router
import Router from 'next/router';

//import axios
import axios from 'axios';
import { Button, FormControl, FormLabel, Input, Text, Textarea } from '@chakra-ui/react';

//fetch with "getServerSideProps"
export async function getServerSideProps({ params }) {
    //http request
    const req = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BACKEND}/api/posts/${params.id}`
    );
    const res = await req.data.data;

    return {
        props: {
            post: res, // <-- assign response
        },
    };
}

function PostEdit(props) {
    //destruct
    const { post } = props;

    //state
    const [image, setImage] = useState('');
    const [title, setTitle] = useState(post.title);
    const [content, setContent] = useState(post.content);

    //state validation
    const [validation, setValidation] = useState({});

    //function "handleFileChange"
    const handleFileChange = (e) => {
        //define variable for get value image data
        const imageData = e.target.files[0];

        //check validation file
        if (!imageData.type.match('image.*')) {
            //set state "image" to null
            setImage('');

            return;
        }

        //assign file to state "image"
        setImage(imageData);
    };

    //method "updatePost"
    const updatePost = async (e) => {
        e.preventDefault();

        //define formData
        const formData = new FormData();

        //append data to "formData"
        formData.append('thumbnail', image);
        formData.append('title', title);
        formData.append('content', content);
        formData.append('_method', 'PUT');

        //send data to server
        await axios
            .post(
                `${process.env.NEXT_PUBLIC_API_BACKEND}/api/posts/${post.id}`,
                formData
            )
            .then(() => {
                //redirect
                Router.push('/posts');
            })
            .catch((error) => {
                //assign validation on state
                setValidation(error.response.data);
            });
    };

    return (
        <form onSubmit={updatePost}>
            <FormControl marginBottom="3">
                <FormLabel>Title</FormLabel>
                <Input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                {validation.errors && (
                    <Text color='red'>{validation.errors.title}</Text>
                )}
            </FormControl>

            <FormControl marginBottom="3">
                <FormLabel>Thumbnail</FormLabel>
                <Input type="file" onChange={handleFileChange} />
                {validation.errors && (
                    <Text color='red'>{validation.errors.thumbnail}</Text>
                )}
            </FormControl>

            <FormControl marginBottom="3">
                <FormLabel>Content</FormLabel>
                <Textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                />
                {validation.errors && (
                    <Text color='red'>{validation.errors.content}</Text>
                )}
            </FormControl>

            <Button
                colorScheme='blue'
                type='submit'
            >
                UPDATE
            </Button>
        </form>
    );
}

export default PostEdit;
