<?php

declare(strict_types=1);

namespace Odiseo\Bundle\AdminBundle\Controller;

use Sylius\Bundle\UserBundle\Form\Type\UserLoginType;
use Symfony\Component\Form\FormFactoryInterface;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\RouterInterface;
use Symfony\Component\Security\Core\Authorization\AuthorizationCheckerInterface;
use Symfony\Component\Security\Http\Authentication\AuthenticationUtils;
use Twig\Environment;

final class SecurityController
{
    /** @var AuthenticationUtils */
    private $authenticationUtils;

    /** @var FormFactoryInterface */
    private $formFactory;

    /** @var Environment */
    private $templatingEngine;

    /** @var AuthorizationCheckerInterface */
    private $authorizationChecker;

    /** @var RouterInterface */
    private $router;

    /**
     * @param Environment $templatingEngine
     */
    public function __construct(
        AuthenticationUtils $authenticationUtils,
        FormFactoryInterface $formFactory,
        object $templatingEngine,
        AuthorizationCheckerInterface $authorizationChecker,
        RouterInterface $router
    ) {
        $this->authenticationUtils = $authenticationUtils;
        $this->formFactory = $formFactory;
        $this->templatingEngine = $templatingEngine;
        $this->authorizationChecker = $authorizationChecker;
        $this->router = $router;
    }

    public function loginAction(Request $request): Response
    {
        $alreadyLoggedInRedirectRoute = $request->attributes->get('_sylius')['logged_in_route'] ?? null;

        if ($alreadyLoggedInRedirectRoute && $this->authorizationChecker->isGranted('IS_AUTHENTICATED_FULLY')) {
            return new RedirectResponse($this->router->generate($alreadyLoggedInRedirectRoute));
        }

        $lastError = $this->authenticationUtils->getLastAuthenticationError();
        $lastUsername = $this->authenticationUtils->getLastUsername();

        $options = $request->attributes->get('_sylius');

        $template = $options['template'] ?? '@OdiseoAdmin/Security/login.html.twig';
        $formType = $options['form'] ?? UserLoginType::class;
        $form = $this->formFactory->createNamed('', $formType);

        return new Response($this->templatingEngine->render($template, [
            'form' => $form->createView(),
            'last_username' => $lastUsername,
            'last_error' => $lastError,
        ]));
    }

    public function checkAction(Request $request): void
    {
        throw new \RuntimeException('You must configure the check path to be handled by the firewall.');
    }

    public function logoutAction(Request $request): void
    {
        throw new \RuntimeException('You must configure the logout path to be handled by the firewall.');
    }
}
