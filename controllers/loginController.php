<?php
class loginController extends controller {

	public function index() {
		$data = array(
			'msg' => ''
		);

		if(!empty($_GET['error'])) {
			if($_GET['error'] == '1') {
				$data['msg'] = 'Usuário e/ou senha inválidos!';
			}
		}

		$this->loadView('login', $data);
	}

	public function signin() {

		if(!empty($_POST['username'])) {
			$username = strtolower($_POST['username']);
			$pass = $_POST['pass'];

			$users = new Users();
			if($users->validateUser($username, $pass)) {
				header("Location: ".BASE_URL);
				exit;
			} else {
				header("Location: ".BASE_URL.'login?error=1');
				exit;
			}
		} else {
			header("Location: ".BASE_URL.'login');
			exit;
		}

	}

	public function signup() {
		$data = array(
			'msg' => ''
		);

		if(!empty($_POST['username'])) {
			$username = strtolower($_POST['username']);
			$pass = $_POST['pass'];

			$users = new Users();

			if($users->validateUsername($username)) {
				if(!$users->userExists($username)) {
					$users->registerUser($username, $pass);

					header("Location: ".BASE_URL."login");
				} else {
					$data['msg'] = 'Usuário já existente!';
				}
			} else {
				$data['msg'] = 'Usuário não válido (Digite apenas letras e números).';
			}
		}

		$this->loadView('signup', $data);
	}

	public function logout() {
		$users = new Users();
		$users->clearLoginHash();

		header("Location: ".BASE_URL.'login');
	}

}
















