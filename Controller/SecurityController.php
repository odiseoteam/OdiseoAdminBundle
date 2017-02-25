<?php

namespace Odiseo\Bundle\AdminBundle\Controller;

use FOS\UserBundle\Controller\SecurityController as BaseSecurityController;

class SecurityController extends BaseSecurityController
{
    /**
     * Renders the login template with the given parameters. Overwrite this function in
     * an extended controller to provide additional data for the login template.
     *
     * @param array $data
     *
     * @return \Symfony\Component\HttpFoundation\Response
     */
    protected function renderLogin(array $data)
    {
        $template = sprintf('OdiseoBackendBundle:Security:login.html.twig');

        return $this->container->get('templating')->renderResponse($template, $data);
    }
}
