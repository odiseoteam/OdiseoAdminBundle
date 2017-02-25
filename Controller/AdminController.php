<?php

namespace Odiseo\Bundle\AdminBundle\Controller;

use Symfony\Component\HttpFoundation\Request;

class AdminController extends Controller
{
    public function dashboardAction(Request $request)
    {
        return $this->render('OdiseoAppBundle:Backend/Main:dashboard.html.twig', array(
        ));
    }
}