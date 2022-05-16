/* eslint-disable no-undef */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useParams } from 'react-router-dom';
import ClipLoader from "react-spinners/ClipLoader";
import Button from '../../../components/bootstrap/Button';
import Card, {
	CardBody, CardFooterRight, CardHeader, CardLabel,
	CardTitle
} from '../../../components/bootstrap/Card';
import Icon from '../../../components/icon/Icon';
import useDarkMode from '../../../hooks/useDarkMode';